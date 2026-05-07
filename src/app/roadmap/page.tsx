import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { ArrowLeft, Check, Loader2, Clock, Lightbulb } from "lucide-react"

const COLUMNS = [
  {
    status: "Shipped",
    color: "var(--success)",
    icon: Check,
    items: [
      { title: "Web workspace", desc: "6 rewriting modes, history, voice input", date: "May 7" },
      { title: "Email + Google auth", desc: "Sign up in 30 seconds", date: "May 6" },
      { title: "Rate limiting + credits", desc: "Honest free tier — 30 rewrites/month", date: "May 6" },
      { title: "Mobile-friendly UX", desc: "Works on phone, tablet, desktop", date: "May 5" },
    ],
  },
  {
    status: "Building",
    color: "var(--accent)",
    icon: Loader2,
    items: [
      { title: "Chrome extension", desc: "Inline bubble inside ChatGPT, Claude.ai, Notion AI", date: "ETA 2 weeks" },
      { title: "Stripe integration", desc: "Pro plan checkout + lifetime deal", date: "ETA 1 week" },
      { title: "Better history search", desc: "Full-text search across all your past rewrites", date: "ETA 10 days" },
    ],
  },
  {
    status: "Planned",
    color: "var(--gold)",
    icon: Clock,
    items: [
      { title: "Desktop overlay (Tauri)", desc: "Hotkey-triggered prism on Mac + Windows", date: "Q3" },
      { title: "Multi-model toggle", desc: "Switch between Gemini, Claude, GPT-4 per rewrite", date: "Q3" },
      { title: "Custom modes", desc: "Save your own rewriting templates", date: "Q3" },
      { title: "Team workspaces", desc: "Share rewrites with teammates", date: "Q4" },
    ],
  },
  {
    status: "Considering",
    color: "var(--text-3)",
    icon: Lightbulb,
    items: [
      { title: "API access", desc: "Programmatic rewriting for power users", date: "TBD" },
      { title: "Slack/Discord bots", desc: "Rewrite directly in chat tools", date: "TBD" },
      { title: "iOS app", desc: "Quick share-sheet rewriter for mobile", date: "TBD" },
    ],
  },
]

export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-3)] hover:text-[var(--text-1)] mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] accent-text mb-3">Roadmap</p>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--text-1)] mb-4">
              What's next<br />
              <span className="font-serif-italic accent-text">in Prism.</span>
            </h1>
            <p className="text-[var(--text-2)] text-lg leading-relaxed">
              Built solo means priorities shift weekly. Here's what's shipped, what's cooking, and what might come.
              Want to vote on priority? <a href="https://twitter.com/intent/follow?screen_name=prism" target="_blank" rel="noopener noreferrer" className="accent-text hover:underline">Reply to me on Twitter</a>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLUMNS.map((col) => {
              const Icon = col.icon
              return (
                <div key={col.status} className="glass p-5">
                  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[var(--border-soft)]">
                    <Icon
                      className="w-4 h-4"
                      style={{ color: col.color }}
                    />
                    <h2 className="font-semibold text-sm" style={{ color: col.color }}>
                      {col.status}
                    </h2>
                    <span className="ml-auto text-xs text-[var(--text-3)]">{col.items.length}</span>
                  </div>

                  <div className="space-y-3">
                    {col.items.map((item) => (
                      <div key={item.title} className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)] p-4 hover:border-[var(--border-mid)] transition-colors">
                        <p className="font-medium text-sm text-[var(--text-1)] mb-1">{item.title}</p>
                        <p className="text-xs text-[var(--text-3)] leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-[10px] text-[var(--text-3)] font-mono">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 glass-elevated p-8 text-center">
            <h3 className="font-display text-2xl text-[var(--text-1)] mb-3">
              Have an idea? Open issue.
            </h3>
            <p className="text-[var(--text-2)] mb-5 max-w-md mx-auto">
              Every feature here came from user feedback. The fastest way to ship something is to convince me it matters.
            </p>
            <a href="https://github.com/ManexManel/prism/issues" target="_blank" rel="noopener noreferrer"
              className="btn-primary !text-sm">
              Open an issue →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
