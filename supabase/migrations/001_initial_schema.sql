-- ============================================
-- EFT Progress Sync - Supabase Migration
-- ============================================

-- 1. 用户档案表（关联 Supabase Auth）
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 自动创建 profile（注册时触发）
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. 小队表
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 小队成员表
CREATE TABLE IF NOT EXISTS team_members (
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (team_id, user_id)
);

-- 4. 任务进度表
CREATE TABLE IF NOT EXISTS quest_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quest_data JSONB NOT NULL DEFAULT '{}',  -- 完整的 buttonStatus 数据: {"questId": true/false, ...}
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================
-- RLS 策略
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_progress ENABLE ROW LEVEL SECURITY;

-- profiles: 所有人可读
CREATE POLICY "profiles_readable" ON profiles FOR SELECT USING (true);
-- profiles: 只能改自己的
CREATE POLICY "profiles_self_update" ON profiles FOR UPDATE USING (id = auth.uid());

-- teams: 成员可读自己的小队
CREATE POLICY "teams_readable_by_members" ON teams FOR SELECT
  USING (
    id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
    OR created_by = auth.uid()
  );
-- teams: 登录用户可创建
CREATE POLICY "teams_insert" ON teams FOR INSERT WITH CHECK (created_by = auth.uid());

-- team_members: 小队成员可读
CREATE POLICY "team_members_readable" ON team_members FOR SELECT
  USING (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );
-- team_members: 小队 owner 可添加成员（通过 invite_code 加入的逻辑在应用层）
CREATE POLICY "team_members_insert" ON team_members FOR INSERT
  WITH CHECK (
    team_id IN (SELECT id FROM teams WHERE created_by = auth.uid())
    OR user_id = auth.uid()
  );

-- quest_progress: 读自己的 + 同队队友的
CREATE POLICY "quest_read_own_and_team" ON quest_progress FOR SELECT
  USING (
    user_id = auth.uid()
    OR user_id IN (
      SELECT tm2.user_id FROM team_members tm1
      JOIN team_members tm2 ON tm1.team_id = tm2.team_id
      WHERE tm1.user_id = auth.uid()
    )
  );
-- quest_progress: 只能写自己的
CREATE POLICY "quest_write_own" ON quest_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "quest_update_own" ON quest_progress FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================
-- Realtime 订阅
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE quest_progress;
