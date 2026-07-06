# EFT 任务进度同步

基于 [eftarkov.com](https://www.eftarkov.com) 的任务进度统计页面 + Supabase 好友同步。

## 功能

- ✅ 逃离塔科夫全部任务进度追踪（~250+ PvE 任务）
- ✅ 按商人筛选（Prapor, Therapist, Skier 等 11 个商人）
- ✅ 3x4 安全箱 / 仙女棒任务标记
- ✅ 搜索任务
- ✅ localStorage 本地存储（离线可用）
- ✅ **好友实时同步**（Supabase WebSocket）
- ✅ 小队邀请码机制
- ✅ 团队进度对比仪表盘
- ✅ JSON 导出/导入/清空

## 部署（免费）

### 1. Supabase 设置

1. 注册 [supabase.com](https://supabase.com)（免费）
2. 创建项目 → SQL Editor → 执行 `supabase/migrations/001_initial_schema.sql`
3. 进入 Settings → API → 复制 `Project URL` 和 `anon public key`

### 2. 配置 sync.js

编辑 `public/sync.js` 顶部：

```js
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGci...';
```

### 3. 部署到 Vercel

```bash
npm i -g vercel
cd public
vercel --prod
```

或者拖拽 `public/` 文件夹到 [vercel.com](https://vercel.com) 网页端。

## 本地测试

```bash
cd public
python3 -m http.server 3456
# 打开 http://localhost:3456
```

## 使用流程

1. 打开网站 → 右上角"好友同步"面板
2. 输入邮箱注册/登录
3. 点击任务旁边的"未完成"按钮标记进度
4. 创建小队（输入队名） → 获取邀请码
5. 好友输入邀请码加入
6. 点击"查看队友进度"对比完成情况

## 技术

- 前端：eftarkov.com 原生 HTML + jQuery（不变）
- 同步：Supabase（PostgreSQL + Realtime WebSocket）
- 部署：Vercel（纯静态 + SPA rewrite）
