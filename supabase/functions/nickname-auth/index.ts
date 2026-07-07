// ============================================
// nickname-auth — 无邮箱无密码的昵称登录
// ============================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// 服务端内部密码 — 用户永远看不到。仅在此 Edge Function 内部使用。
const INTERNAL_PASSWORD = 'eft-nickname-auth-9251b3f8'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

// 昵称 → 内部邮箱映射（不暴露给前端）
const NICKNAME_CONFIG: Record<string, string> = {
  '玩家1': 'p1@eft.internal',
  '玩家2': 'p2@eft.internal',
}

Deno.serve(async (req: Request) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let nickname: string
  try {
    const body = await req.json()
    nickname = body.nickname
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const email = NICKNAME_CONFIG[nickname]
  if (!email) {
    return new Response(JSON.stringify({ error: '未知昵称，可选: 玩家1, 玩家2' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // 1. 使用 service_role 客户端确保用户存在
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data: userList } = await adminClient.auth.admin.listUsers()
    let user = userList?.users?.find((u) => u.email === email)

    if (!user) {
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password: INTERNAL_PASSWORD,
        email_confirm: true,
        user_metadata: { display_name: nickname },
      })
      if (createError) throw createError
      user = newUser.user
    }

    // 2. 使用 anon 客户端登录，获取 session token
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data: signInData, error: signInError } = await anonClient.auth.signInWithPassword({
      email,
      password: INTERNAL_PASSWORD,
    })
    if (signInError) throw signInError

    return new Response(JSON.stringify({ session: signInData.session }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : '服务器内部错误'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
