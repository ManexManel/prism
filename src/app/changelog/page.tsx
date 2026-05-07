import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { ArrowLeft, Sparkles, Wrench, Zap } from "lucide-react"

const ENTRIES = [
  {
    version: "v0.1.0",
    date: "May 7, 2026",
    type: "launch",
    icon: Sparkles,
    title: "Prism is live",
    items: [
      "6 rewriting modes shipped: Direct, Diagnostic, Dialogue, 3 Angles, Tone Shift, Voice Input",
      "Web workspace with full history (50 last rewrites)",
      "Voice input with browser language auto-detection",
      "Email + password authentication via Supabase",
      "Free tier: 30 rewrites/month, no credit card",
      "Pro tier: €9/month — first 50 users get €49 lifetime",
    ],
  },
  {
    version: "v0.0.9",
    date: "May 6, 2026",
    type: "polish",
    icon: Wrench,
    title: "Pre-launch polish",
    items: [
      "Removed broken Google OAuth flow",
      "Fixed Supabase cookie bug in edge runtime → moved to nodejs runtime",
      "Added rate limiting (10 requests/min/user)",
      "Credits now decrement properly after each rewrite",
      "Per-item history delete (hover the trash icon)",
    ],
  },
  {
    version: "v0.0.5",
    date: "May 4, 2026",
    type: "feat",
    icon: Zap,
    title: "Glassmorphism design system",
    items: [
      "Full visual rebuild — coral accent on near-black",
      "Custom Plus Jakarta Sans + Instrument Serif typography",
      "Animated hero demo with cycling prompts",
      "Mesh gradient backgrounds + dot patterns",
    ],
  },
]

const TYPE_STYLES = {
  launch: { color: "var(--accent)", bg: "var(--accent-soft)" },
  feat:   { color: "var(--success)", bg: "rgba(74,222,128,0.08)" },
  polish: { color: "var(--gold)", bg: "var(--gold-soft)" },
} as const

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-3)] hover:text-[var(--text-1)] mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] accent-text mb-3">Changelog</p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--text-1)] mb-4">
            What's new<br />
            <span className="font-serif-italic accent-text">in Prism.</span>
          </h1>
          <p className="text-[var(--text-2)] text-lg leading-relaxed mb-16 max-w-xl">
            Every shipped feature, every fix, every tweak. Updated whenever a commit hits production.
          </p>

          <div className="space-y-12">
            {ENTRIES.map((entry) => {
              const Icon = entry.icon
              const style = TYPE_STYLES[entry.type as keyof typeof TYPE_STYLES]
              return (
                <article key={entry.version} className="relative pl-8 border-l border-[var(--border-soft)]">
                  <span className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full"
                    style={{ background: style.color, boxShadow: `0 0 0 4px var(--bg-base), 0 0 12px ${style.color}` }} />

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-[var(--text-3)]">{entry.version}</span>
                    <span className="text-xs text-[var(--text-3)]">·</span>
                    <span className="text-xs text-[var(--text-3)]">{entry.date}</span>
                    <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                      style={{ background: style.bg, color: style.color }}>
                      <Icon className="w-3 h-3" />
                      {entry.type}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl text-[var(--text-1)] mb-4">{entry.title}</h2>

                  <ul className="space-y-2">
                    {entry.items.map((item, i) => (
                      <li key={i} className="text-[var(--text-2)] leading-relaxed flex items-start gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--text-3)" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>

          <div className="mt-16 glass p-6 text-center">
            <p className="text-sm text-[var(--text-2)] mb-3">
              Want updates as they ship?
            </p>
            <a href="https://twitter.com/intent/follow?screen_name=prism" target="_blank" rel="noopener noreferrer"
              className="btn-ghost !text-sm">
              Follow on Twitter →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
