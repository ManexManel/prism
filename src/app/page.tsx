"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { HeroDemo } from "@/components/HeroDemo"
import {
  ArrowRight, Check, Wand2, MessageSquare, Layers, Mic, Zap,
  Globe, Clock, Code2, Sparkles, Star, ArrowUpRight,
} from "lucide-react"

/* ─── Reveal helper ─────────────────────────────────────────── */
const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
}

/* ─── Mode definitions ──────────────────────────────────────── */
const HERO_MODE = {
  icon: Wand2,
  label: "Diagnostic",
  tagline: "Most used",
  description:
    "Spots vague language, missing context, undefined role — and patches all of it in one pass. Start here when you don't know what's wrong.",
}

const SIDE_MODES = [
  { icon: Zap,           label: "Direct Rewrite", description: "One-shot sharpening. Faster output, less noise." },
  { icon: MessageSquare, label: "Dialogue",       description: "Reframes as step-by-step clarification flow." },
  { icon: Layers,        label: "3 Angles",       description: "Generates three framings of the same intent." },
  { icon: MessageSquare, label: "Tone Shift",     description: "Expert, casual, Socratic, blunt — pick a register." },
  { icon: Mic,           label: "Voice Input",    description: "Speak the intent. Prism cleans the prompt." },
]

const STEPS = [
  { n: "01", title: "Paste your prompt",    desc: "Drop a vague or messy prompt. Voice input works too." },
  { n: "02", title: "Pick a mode",          desc: "Six modes, each fixes a specific problem. Or hit Direct." },
  { n: "03", title: "Copy or iterate",      desc: "One click to copy. Or keep refining inside Prism." },
]

const PLANS = [
  {
    name: "Free",
    price: "0",
    description: "All 6 modes, no card required.",
    features: ["30 rewrites / month", "All 6 modes", "Voice input", "7-day history"],
    cta: "Start free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "9",
    description: "For people who run AI all day.",
    features: [
      "Unlimited rewrites",
      "All 6 modes + voice",
      "Full history",
      "Early access to overlay",
      "Priority support",
      "Lifetime €49 (first 50 users)",
    ],
    cta: "Get Pro",
    href: "/signup?plan=pro",
    highlighted: true,
  },
]

const FAQS = [
  {
    q: "Why 6 modes instead of 1?",
    a: "A single 'improve my prompt' button gives generic results. Different prompt failures need different fixes. Diagnostic finds vagueness; Dialogue restructures; 3 Angles unblocks ideation. Six tools, one panel.",
  },
  {
    q: "Which AI model is behind Prism?",
    a: "Gemini 2.5 Flash. Fast, cheap, and surprisingly good at structural rewriting. We may add Claude/GPT-4 as Pro options if users want a model toggle.",
  },
  {
    q: "Can I use it inside ChatGPT directly?",
    a: "Not yet — Chrome extension ships in 2 weeks. For now, paste in the workspace, copy the result, paste into ChatGPT.",
  },
  {
    q: "What about the lifetime deal?",
    a: "First 50 paying users get €49 lifetime access (instead of €9/mo). Once we hit 50, the deal closes forever. Built solo means lifetime ≠ unlimited support promises — be clear-eyed about that.",
  },
]

export default function LandingPage() {
  return (
    <div className="relative">
      <Navbar />

      {/* ═══ HERO ═════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="mesh-bg" />
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* Build-in-public pill */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium mb-7 border"
            style={{ background: "var(--surface-2)", borderColor: "var(--border-soft)", color: "var(--text-2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-soft" style={{ background: "var(--success)" }} />
            <span>Built in public · v0.1 — shipping live updates</span>
            <Link href="/changelog" className="accent-text font-semibold hover:underline">
              See changelog →
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[44px] sm:text-[64px] md:text-[80px] text-[var(--text-1)] mb-6"
          >
            Your prompts are why<br />
            <span className="font-serif-italic" style={{ color: "var(--accent)" }}>ChatGPT is mid.</span>
            <br />Fix them in one click.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-lg md:text-xl text-[var(--text-2)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Built for makers, marketers, and operators who run 50+ prompts a day.
            Six rewriting modes. Two seconds. Zero generic answers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
          >
            <Link href="/signup" className="btn-primary group !text-sm !px-6 !py-3.5">
              Start free — no card
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#how-it-works" className="btn-ghost !text-sm !px-6 !py-3.5">
              See how it works
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-[var(--text-3)] mb-16"
          >
            30 rewrites included · Setup in 30 seconds · Cancel anytime
          </motion.p>

          {/* Animated demo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <HeroDemo />
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST BAR ════════════════════════════════════════════════ */}
      <section className="py-10 px-6 border-y border-[var(--border-soft)]" style={{ background: "var(--bg-rise)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "6", label: "rewriting modes" },
              { stat: "<2s", label: "average rewrite" },
              { stat: "30", label: "free per month" },
              { stat: "0€", label: "to start" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-display text-3xl md:text-4xl text-[var(--text-1)] mb-1">{item.stat}</div>
                <div className="text-xs text-[var(--text-3)] uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MODES — hero card + grid ══════════════════════════════════ */}
      <section id="features" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...reveal} className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] accent-text mb-3">
              The six modes
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text-1)] mb-4">
              Different failure,<br />
              <span className="font-serif-italic accent-text">different fix.</span>
            </h2>
            <p className="text-[var(--text-2)] text-lg leading-relaxed">
              Each mode targets a specific reason your prompt is failing. Pick the one that matches your problem — or hit Direct and let Prism decide.
            </p>
          </motion.div>

          {/* Hero mode card */}
          <motion.div {...reveal} className="mb-4">
            <div className="glass-elevated p-8 md:p-10 grid md:grid-cols-[1fr_auto] items-center gap-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--accent-soft)", border: "1px solid rgba(255,94,58,0.25)" }}>
                    <HERO_MODE.icon className="w-6 h-6 accent-text" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                    {HERO_MODE.tagline}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-[var(--text-1)] mb-3">{HERO_MODE.label}</h3>
                <p className="text-[var(--text-2)] text-base leading-relaxed max-w-xl">{HERO_MODE.description}</p>
              </div>
              <Link href="/signup" className="btn-ghost !text-sm shrink-0">
                Try this mode
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Side modes grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIDE_MODES.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="glass glass-hover p-6"
                >
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)" }}>
                    <Icon className="w-5 h-5 text-[var(--text-2)]" />
                  </span>
                  <h3 className="text-[var(--text-1)] font-semibold mb-1.5">{m.label}</h3>
                  <p className="text-sm text-[var(--text-3)] leading-relaxed">{m.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS — different bg ═══════════════════════════════ */}
      <section id="how-it-works" className="py-28 px-6 relative overflow-hidden" style={{ background: "var(--bg-rise)" }}>
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div {...reveal} className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] accent-text mb-3">How it works</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text-1)] mb-4">
              Bad prompt to great prompt<br />
              <span className="font-serif-italic accent-text">in 10 seconds.</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="glass p-6 md:p-8 flex items-start gap-6"
              >
                <span className="font-display text-5xl md:text-6xl shrink-0 leading-none coral-gradient">
                  {s.n}
                </span>
                <div className="pt-1">
                  <h3 className="font-semibold text-xl text-[var(--text-1)] mb-2">{s.title}</h3>
                  <p className="text-[var(--text-2)] leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROADMAP / HONESTY ═════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...reveal} className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] accent-text mb-3">No fake testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text-1)] mb-3">
              Public roadmap, real updates
            </h2>
            <p className="text-[var(--text-2)]">
              Built solo. Every release goes here, every metric stays honest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { tag: "SHIPPED", color: "var(--success)", title: "Web workspace", desc: "6 modes, history, voice input — live now." },
              { tag: "BUILDING", color: "var(--accent)", title: "Chrome extension", desc: "Inline bubble in ChatGPT, Claude, Notion. ETA 2 weeks." },
              { tag: "PLANNED", color: "var(--text-3)", title: "Desktop overlay", desc: "Hotkey-triggered prism overlay on Mac + Windows. Q3." },
            ].map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: it.color }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: it.color }}>
                    {it.tag}
                  </span>
                </div>
                <p className="font-semibold text-[var(--text-1)] mb-1">{it.title}</p>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">{it.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/roadmap" className="text-sm accent-text hover:underline inline-flex items-center gap-1">
              View full roadmap <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ══════════════════════════════════════════════════ */}
      <section id="pricing" className="py-28 px-6 relative" style={{ background: "var(--bg-rise)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div {...reveal} className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] accent-text mb-3">Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text-1)] mb-4">
              Free forever.<br />
              <span className="font-serif-italic accent-text">Pro when AI is daily.</span>
            </h2>
            <p className="text-[var(--text-2)] text-lg">
              First 50 users → €49 lifetime instead of €9/month. <strong className="accent-text">Closes once we hit 50.</strong>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={plan.highlighted ? "glass-elevated p-8 relative" : "glass p-8"}
                style={
                  plan.highlighted
                    ? { borderColor: "rgba(255,94,58,0.4)", boxShadow: "0 0 40px rgba(255,94,58,0.12)" }
                    : undefined
                }
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: "var(--accent)", color: "var(--bg-base)" }}>
                    Most popular
                  </span>
                )}
                <p className="font-semibold text-[var(--text-1)] mb-2">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-display text-5xl text-[var(--text-1)]">€{plan.price}</span>
                  <span className="text-[var(--text-3)] text-sm">/month</span>
                </div>
                <p className="text-sm text-[var(--text-3)] mb-7">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[var(--text-2)]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.highlighted ? "var(--accent)" : "var(--success)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={plan.highlighted ? "btn-primary w-full justify-center" : "btn-ghost w-full justify-center"}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...reveal} className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] accent-text mb-3">FAQ</p>
            <h2 className="font-display text-4xl text-[var(--text-1)]">
              Questions you probably have
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.details
                key={f.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass p-5 group"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-[var(--text-1)]">{f.q}</span>
                  <span className="accent-text text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-[var(--text-2)] leading-relaxed mt-3 pt-3 border-t border-[var(--border-soft)]">
                  {f.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDIE MAKER ══════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "var(--bg-rise)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...reveal} className="glass-elevated p-10">
            <Code2 className="w-9 h-9 mx-auto mb-5 accent-text" />
            <h3 className="font-display text-2xl text-[var(--text-1)] mb-3">
              Built solo. Shipped honest.
            </h3>
            <p className="text-[var(--text-2)] leading-relaxed mb-6 max-w-md mx-auto">
              Prism is one developer, one weekend stack, public metrics. No VC, no marketing budget, no inflated numbers.
              Every shipped feature, every churn, every revenue drop is on Twitter.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="https://twitter.com/intent/follow?screen_name=prism" target="_blank" rel="noopener noreferrer"
                className="btn-ghost !text-xs !px-4 !py-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Follow the build
              </a>
              <a href="https://github.com/ManexManel/prism" target="_blank" rel="noopener noreferrer"
                className="btn-ghost !text-xs !px-4 !py-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Source on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        <motion.div {...reveal} className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl text-[var(--text-1)] mb-5">
            Stop writing<br />
            <span className="font-serif-italic accent-text">mid prompts.</span>
          </h2>
          <p className="text-lg text-[var(--text-2)] mb-9 max-w-xl mx-auto">
            30 free rewrites. No credit card. Setup in 30 seconds.
          </p>
          <Link href="/signup" className="btn-primary group !text-base !px-8 !py-4">
            Get started — it's free
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs text-[var(--text-3)] mt-5">
            Or check the <Link href="/changelog" className="accent-text hover:underline">changelog</Link>
            {" "}/<Link href="/roadmap" className="accent-text hover:underline ml-1">roadmap</Link> first.
          </p>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══════════════════════════════════════════════════ */}
      <footer className="border-t border-[var(--border-soft)] py-14 px-6" style={{ background: "var(--bg-rise)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10 mb-10">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
                  <defs>
                    <linearGradient id="footer-grad" x1="0" y1="0" x2="28" y2="28">
                      <stop offset="0" stopColor="#FF7A5C" />
                      <stop offset="1" stopColor="#E8401C" />
                    </linearGradient>
                  </defs>
                  <path d="M14 3 L25 23 L3 23 Z" fill="url(#footer-grad)" stroke="#FF5E3A" strokeWidth="0.5" />
                  <circle cx="14" cy="14" r="1.5" fill="#FAFAFA" />
                </svg>
                <span className="font-display text-lg text-[var(--text-1)]">Prism<span className="accent-text">.</span></span>
              </Link>
              <p className="text-sm text-[var(--text-3)] max-w-xs leading-relaxed">
                Rewrite your AI prompts in 6 different modes. Built solo, in public.
              </p>
            </div>

            <FooterCol title="Product" links={[
              { label: "Workspace", href: "/workspace" },
              { label: "Pricing", href: "#pricing" },
              { label: "Changelog", href: "/changelog" },
              { label: "Roadmap", href: "/roadmap" },
            ]} />
            <FooterCol title="Company" links={[
              { label: "Twitter", href: "https://twitter.com/prism", external: true },
              { label: "GitHub", href: "https://github.com/ManexManel/prism", external: true },
              { label: "Contact", href: "mailto:hello@prism.app" },
            ]} />
            <FooterCol title="Legal" links={[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ]} />
          </div>

          <div className="border-t border-[var(--border-soft)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-3)]">
            <p>© 2026 Prism. Built solo. Shipped honest.</p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full pulse-soft" style={{ background: "var(--success)" }} />
              All systems operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-3)] mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer"
                className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
