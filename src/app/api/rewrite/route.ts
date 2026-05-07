import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/* ─── Modes ──────────────────────────────────────────────────────────── */
const MODES = {
  direct: {
    label: "Direct Rewrite",
    system: `You are an expert prompt engineer. Rewrite the given prompt to be more specific, structured and effective. Remove vagueness, add context, use clear directives. Keep the intent but improve precision. Output ONLY the rewritten prompt — no explanation.`,
  },
  diagnostic: {
    label: "Diagnostic",
    system: `You are an expert prompt engineer. First identify what is vague or missing in the prompt (role, context, format, constraints). Then rewrite it to fix those gaps. Output ONLY the improved prompt — no explanation, no bullet list.`,
  },
  dialogue: {
    label: "Dialogue",
    system: `You are an expert prompt engineer. Rewrite this prompt as a structured dialogue — where the AI is asked to engage in back-and-forth clarification before answering. The prompt should instruct the AI to ask follow-up questions first if needed. Output ONLY the rewritten prompt.`,
  },
  angles: {
    label: "3 Angles",
    system: `You are an expert prompt engineer. Generate 3 different versions of this prompt, each from a different angle or framing. Number them 1., 2., 3. Keep each version concise and actionable. Output ONLY the 3 versions.`,
  },
  tone: {
    label: "Tone Shift",
    system: `You are an expert prompt engineer. Rewrite this prompt in an expert, authoritative tone — as if briefing a senior specialist. Remove all hedging language. Add role definition, expected output format, and depth requirements. Output ONLY the rewritten prompt.`,
  },
  expand: {
    label: "Expansion",
    system: `You are an expert prompt engineer. Expand this prompt by adding: a clear role definition for the AI, specific context, step-by-step structure for the response, and a format requirement (e.g. bullet list, table, sections). Output ONLY the expanded prompt.`,
  },
}

type ModeKey = keyof typeof MODES

/* ─── In-memory rate limiter (10 req/minute per user) ────────────────── */
/* For production, swap for Upstash Redis or Vercel KV. */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT       = 10
const RATE_WINDOW_MS   = 60_000

function checkRateLimit(userId: string): { ok: boolean; retryIn?: number } {
  const now    = Date.now()
  const entry  = rateLimitMap.get(userId)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return { ok: true }
  }
  if (entry.count >= RATE_LIMIT) {
    return { ok: false, retryIn: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count++
  return { ok: true }
}

/* ─── Handler ────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    /* Rate limit */
    const rl = checkRateLimit(user.id)
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Slow down — try again in ${rl.retryIn}s` },
        { status: 429, headers: { "Retry-After": String(rl.retryIn) } }
      )
    }

    /* Body validation */
    const body = await req.json()
    const { prompt, mode = "direct" } = body as { prompt: string; mode: ModeKey }

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json({ error: "Prompt too short (min 3 characters)" }, { status: 400 })
    }
    if (prompt.length > 8000) {
      return NextResponse.json({ error: "Prompt too long (max 8000 characters)" }, { status: 400 })
    }
    if (!MODES[mode]) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 })
    }

    /* Credits check */
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits, plan")
      .eq("id", user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 500 })
    }

    if (profile.plan === "free" && profile.credits <= 0) {
      return NextResponse.json(
        { error: "No credits left. Upgrade to Pro for unlimited rewrites.", code: "NO_CREDITS" },
        { status: 402 }
      )
    }

    /* Gemini call */
    const GEMINI_KEY = process.env.GEMINI_API_KEY
    if (!GEMINI_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const modeConfig = MODES[mode]

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `${modeConfig.system}\n\n---\nOriginal prompt:\n${prompt.trim()}` }] },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      }
    )

    if (res.status === 429) {
      return NextResponse.json(
        { error: "AI service is rate-limited right now. Try again in 30s." },
        { status: 429 }
      )
    }
    if (!res.ok) {
      const errBody = await res.text()
      console.error("Gemini error:", res.status, errBody)
      return NextResponse.json({ error: "AI service error. Try again." }, { status: 502 })
    }

    const json   = await res.json()
    const result = json.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

    if (!result) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 502 })
    }

    /* Decrement credits + save history (free users only) */
    if (profile.plan === "free") {
      await supabase
        .from("profiles")
        .update({ credits: profile.credits - 1 })
        .eq("id", user.id)
    }

    await supabase.from("rewrites").insert({
      user_id:    user.id,
      original:   prompt.trim(),
      rewritten:  result,
      mode,
      mode_label: modeConfig.label,
    })

    return NextResponse.json({
      result,
      mode,
      mode_label:        modeConfig.label,
      credits_remaining: profile.plan === "free" ? profile.credits - 1 : null,
    })
  } catch (err) {
    console.error("Rewrite error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
