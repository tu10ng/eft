// ============================================
// Supabase client singleton
// ============================================
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ywzdjijjeqeyevhrudrf.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3emRqaWpqZXFleWV2aHJ1ZHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQzOTYsImV4cCI6MjA5ODkyMDM5Nn0.6YbjRFX0iLhVTk8GFPI3_RK44Bu_A6J5Zg-DQIPQpvk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
