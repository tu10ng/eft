-- ============================================
-- EFT Progress Sync — Migration 002: Quest Timestamps + Index
-- ============================================

-- 1. Add schema version tracking
ALTER TABLE quest_progress
ADD COLUMN IF NOT EXISTS schema_version INTEGER DEFAULT 1;

-- 2. Index on updated_at for efficient polling queries
CREATE INDEX IF NOT EXISTS idx_quest_progress_updated_at
ON quest_progress(user_id, updated_at DESC);

-- 3. Constraint: quest_data must be a valid JSONB object
ALTER TABLE quest_progress
ADD CONSTRAINT quest_data_is_object CHECK (jsonb_typeof(quest_data) = 'object');

-- 4. Migrate legacy quest_data from v1 boolean format to v2 timestamped format
--    Legacy:  {"questId": true, ...}
--    V2:      {"questId": {"v": true, "t": "2024-01-01T00:00:00Z"}, ...}
--    This function is called by the application during migration, or can be run manually.
CREATE OR REPLACE FUNCTION migrate_quest_data_v2(data JSONB)
RETURNS JSONB AS $$
DECLARE
    key TEXT;
    val JSONB;
    result JSONB := '{}';
    migrated_count INT := 0;
BEGIN
    FOR key, val IN SELECT * FROM jsonb_each(data)
    LOOP
        IF jsonb_typeof(val) = 'boolean' THEN
            -- Legacy boolean -> wrap in {v, t}
            result := result || jsonb_build_object(
                key,
                jsonb_build_object(
                    'v', val,
                    't', to_char(now(), 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
                )
            );
            migrated_count := migrated_count + 1;
        ELSIF jsonb_typeof(val) = 'object' AND val ? 'v' THEN
            -- Already v2 format, preserve as-is
            result := result || jsonb_build_object(key, val);
        ELSE
            -- Unknown format, preserve as-is
            result := result || jsonb_build_object(key, val);
        END IF;
    END LOOP;

    RAISE NOTICE 'migrate_quest_data_v2: migrated % entries from legacy to v2 format', migrated_count;
    RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 5. Function to optionally migrate all existing rows
CREATE OR REPLACE FUNCTION migrate_all_quest_data_to_v2()
RETURNS TABLE(user_id UUID, migrated_count INT) AS $$
DECLARE
    r RECORD;
    new_data JSONB;
    old_count INT;
    new_count INT;
    changed INT;
BEGIN
    FOR r IN SELECT * FROM quest_progress LOOP
        old_count := (SELECT count(*) FROM jsonb_each(r.quest_data));
        new_data := migrate_quest_data_v2(r.quest_data);
        new_count := (SELECT count(*) FROM jsonb_each(new_data));

        IF old_count != new_count THEN
            changed := 1;
        ELSE
            changed := 0;
        END IF;

        UPDATE quest_progress
        SET quest_data = new_data,
            schema_version = 2,
            updated_at = now()
        WHERE id = r.id;

        user_id := r.user_id;
        migrated_count := changed;
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
