# Prism — AI Prompt Rewriter SaaS

> Write better prompts, instantly. Select text anywhere, rewrite in 6 modes.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS — glassmorphism dark design system
- **Auth + DB**: Supabase (email/password + Google OAuth, RLS)
- **AI**: Gemini 2.5 Flash (via REST API)
- **Deployment**: Vercel

## Features
- 6 rewrite modes: Direct, Diagnostic, Dialogue, 3 Angles, Tone Shift, Expand
- Voice input (Web Speech API)
- Full rewrite history per user (sidebar)
- Google OAuth + email/password auth
- Credits system (30 free / unlimited Pro)
- Settings page with danger zone

---

## Setup

### 1. Environment variables

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=      # Supabase > Settings > API
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase > Settings > API
GEMINI_API_KEY=                # https://aistudio.google.com/apikey
```

### 2. Supabase

1. Create a project at supabase.com
2. SQL Editor → run `supabase/schema.sql`
3. Authentication → Providers → enable Google OAuth
4. Authentication → URL Configuration → add your domain

### 3. Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

### 4. Deploy

```bash
npx vercel
```

Add the 3 env vars in the Vercel dashboard.

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Sign in (email + Google) |
| `/signup` | Create account |
| `/workspace` | Main rewrite workspace |
| `/settings` | Account, plan, history |
| `/auth/callback` | OAuth redirect handler |

## API

**POST `/api/rewrite`**
```json
{ "prompt": "write something about X", "mode": "diagnostic" }
```
Modes: `direct` · `diagnostic` · `dialogue` · `angles` · `tone` · `expand`

---

## Design System

Built with the **ui-ux-pro-max** skill (glassmorphism dark):
- Background: `#08080f`
- Glass surfaces: `rgba(255,255,255,0.04)` + `backdrop-filter: blur(16px)`
- Primary: `#8b5cf6` violet → `#6366f1` indigo gradient
- Typography: Plus Jakarta Sans (headings) + Inter (body)
- Copywriting: marketing cold-email skill principles (specific benefits, no jargon, strong CTAs)
