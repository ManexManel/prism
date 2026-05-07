import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/Button"
import {
  Zap, Wand2, MessageSquare, Layers, Mic, Clock,
  ArrowRight, Globe, Check, Code2
} from "lucide-react"

/* ─── Rewrite mode data ─────────────────────────────────────────────── */
const MODES = [
  { icon: Zap,            label: "Direct Rewrite", description: "Sharpens your prompt in one pass. More precise, less noise.",        color: "#8b5cf6" },
  { icon: MessageSquare,  label: "Dialogue",       description: "Turns your rough idea into a step-by-step conversation prompt.",     color: "#6366f1" },
  { icon: Layers,         label: "3 Angles",       description: "Generates three different framings of the same request.",            color: "#a78bfa" },
  { icon: Wand2,          label: "Diagnostic",     description: "Spots what's vague in your prompt and fixes it automatically.",      color: "#818cf8" },
  { icon: MessageSquare,  label: "Tone Shift",     description: "Rewrites for a specific tone — expert, casual, Socratic, blunt.",    color: "#c4b5fd" },
  { icon: Mic,            label: "Voice Input",    description: "Speak your intent, Prism turns it into a clean prompt.",             color: "#7c3aed" },
]

/* ─── Features ──────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Globe,
    title: "Web app today, overlay tomorrow",
    description:
      "Use the workspace right now in your browser. Desktop overlay (Mac + Windows) and Chrome extension are next on the roadmap — vote on what ships first.",
  },
  {
    icon: Layers,
    title: "6 modes, one click",
    description:
      "Direct rewrite, diagnostic, dialogue, 3 angles, tone shift, voice input — pick the one that fits, get a result in 2 seconds.",
  },
  {
    icon: Clock,
    title: "Full history",
    description:
      "Every rewrite is saved to your workspace. Find that prompt you improved two weeks ago in seconds.",
  },
]

/* ─── Pricing ───────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Free",
    price: "0",
    description: "Try all 6 modes, no card required.",
    features: ["30 rewrites / month", "All 6 modes", "Voice input", "7-day history"],
    cta: "Start free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9",
    description: "For people who use AI every day.",
    features: [
      "Unlimited rewrites",
      "All 6 modes + voice input",
      "Full history",
      "Early access to overlay app",
      "Priority support",
    ],
    cta: "Join early access",
    href: "/signup?plan=pro",
    highlighted: true,
  },
]

/* ─── How it works ──────────────────────────────────────────────────── */
const STEPS = [
  { step: "01", title: "Paste your prompt",      description: "Drop a vague or messy prompt into the workspace input." },
  { step: "02", title: "Pick a mode",            description: "Six modes, each fixes a specific problem. Or hit Direct and let Prism decide." },
  { step: "03", title: "Copy or replace",        description: "One click to copy the result, or replace your input to keep iterating." },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20">
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[80px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Honest "build in public" badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-[var(--text-secondary)] mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            Built in public · v0.1 — your feedback shapes the roadmap
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] mb-6 animate-fade-up leading-[1.08]">
            Stop guessing.
            <br />
            <span className="gradient-text">Write prompts that work.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed">
            Paste any prompt. Prism rewrites it in 6 different modes — diagnostic,
            dialogue, 3 angles, tone shift — so you stop getting generic answers
            from ChatGPT and start getting exactly what you asked for.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
            <Link href="/signup">
              <Button size="lg" className="group">
                Try it free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="ghost" size="lg">
                See how it works
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-[var(--text-muted)] animate-fade-up">
            30 rewrites free · No credit card · Built solo, shipped honest
          </p>

          {/* Product preview */}
          <div className="mt-16 glass-elevated p-6 max-w-2xl mx-auto animate-fade-up text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-[var(--text-muted)]">Prism — workspace</span>
            </div>
            <div className="space-y-3">
              <div className="glass p-3 rounded-lg">
                <p className="text-xs text-[var(--text-muted)] mb-1">Your prompt</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  write me something about marketing strategy
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] px-1">
                <Wand2 className="w-3.5 h-3.5 text-violet-400" />
                Diagnostic mode applied →
              </div>
              <div className="glass p-3 rounded-lg border border-[var(--primary)] bg-[rgba(139,92,246,0.06)]">
                <p className="text-xs text-violet-400 mb-1">Rewritten</p>
                <p className="text-sm text-[var(--text-primary)]">
                  Act as a B2B marketing strategist. Analyse the top 3 go-to-market
                  levers for a SaaS product targeting mid-market companies (50–500
                  employees). For each lever, explain the expected outcome, required
                  resources, and one concrete first step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Roadmap (replaces fake testimonials) ──────────────────────── */}
      <section className="py-16 border-y border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Honest roadmap
          </p>
          <h2 className="text-center text-2xl font-bold text-[var(--text-primary)] mb-10">
            What's shipped, what's next
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass p-5">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">SHIPPED</span>
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Web workspace</p>
              <p className="text-xs text-[var(--text-muted)]">6 modes, history, voice input — live now.</p>
            </div>
            <div className="glass p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <span className="text-xs font-semibold text-amber-400">BUILDING</span>
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Chrome extension</p>
              <p className="text-xs text-[var(--text-muted)]">Inline bubble in ChatGPT, Claude, Notion. ETA 2 weeks.</p>
            </div>
            <div className="glass p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="text-xs font-semibold text-[var(--text-muted)]">PLANNED</span>
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Desktop overlay</p>
              <p className="text-xs text-[var(--text-muted)]">Hotkey-triggered bubble on Mac + Windows. Q3.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modes ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Six ways to rewrite,
              <span className="gradient-text"> one panel</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Each mode targets a different problem. Bad structure, wrong tone, vague intent — pick the fix.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODES.map((m) => {
              const Icon = m.icon
              return (
                <div key={m.label} className="glass glass-hover p-5 space-y-3">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: m.color + "22", color: m.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-semibold text-[var(--text-primary)]">{m.label}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{m.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Three steps, zero friction
            </h2>
            <p className="text-[var(--text-secondary)]">
              From bad prompt to great prompt in under 10 seconds.
            </p>
          </div>
          <div className="space-y-4">
            {STEPS.map((s) => (
              <div key={s.step} className="glass flex items-start gap-6 p-6">
                <span className="text-3xl font-extrabold gradient-text shrink-0">{s.step}</span>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">{s.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features detail ───────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="glass p-6 space-y-4">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(139,92,246,0.15)]">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </span>
                  <h3 className="font-semibold text-[var(--text-primary)]">{f.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Simple pricing
            </h2>
            <p className="text-[var(--text-secondary)]">
              Free forever for casual use. €9/mo when AI becomes a daily tool.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.highlighted
                    ? "glass-elevated p-8 border-[var(--primary)] shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                    : "glass p-8"
                }
              >
                {plan.highlighted && (
                  <span className="inline-block glass px-3 py-1 rounded-full text-xs font-semibold text-violet-400 border-violet-500/30 mb-4">
                    Early bird · €9 forever
                  </span>
                )}
                <p className="text-lg font-bold text-[var(--text-primary)] mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-[var(--text-primary)]">
                    €{plan.price}
                  </span>
                  <span className="text-[var(--text-muted)] text-sm">/month</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block">
                  <Button
                    variant={plan.highlighted ? "primary" : "ghost"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built by indie maker (replaces fake social proof) ─────────── */}
      <section className="py-20 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-2xl mx-auto text-center glass p-8">
          <Code2 className="w-8 h-8 text-violet-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
            Built solo, shipped honest
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            Prism is built in public by one indie maker. Every shipped feature, every metric,
            every roadmap change is shared on Twitter. Real users, real feedback, no inflated numbers.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://twitter.com/intent/follow?screen_name=prism"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover px-4 py-2 rounded-full text-sm flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Follow the build
            </a>
            <a
              href="https://github.com/prism"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover px-4 py-2 rounded-full text-sm flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              Source on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center glass-elevated p-12">
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Start writing prompts that actually work
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            30 rewrites free. No credit card. Cancel anytime.
          </p>
          <Link href="/signup">
            <Button size="lg" className="group">
              Create free account
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border-subtle)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="gradient-text">Prism</span>
          </div>
          <nav className="flex gap-6 text-sm text-[var(--text-muted)]">
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">Terms</Link>
            <a href="mailto:hello@prism.app" className="hover:text-[var(--text-primary)] transition-colors">Contact</a>
          </nav>
          <p className="text-xs text-[var(--text-muted)]">© 2026 Prism. Built in public.</p>
        </div>
      </footer>
    </div>
  )
}
