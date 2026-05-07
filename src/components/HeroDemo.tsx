"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, Sparkles } from "lucide-react"

const PAIRS = [
  {
    mode: "Diagnostic",
    raw: "write me something about marketing strategy",
    rewritten:
      "Act as a B2B marketing strategist. Analyse the top 3 go-to-market levers for a SaaS targeting mid-market (50–500 employees). For each: expected outcome, required resources, one concrete first step.",
  },
  {
    mode: "Dialogue",
    raw: "help me with a cold email",
    rewritten:
      "Walk me through writing a cold email step by step. Start by asking me: 1) target persona's role, 2) their current pain, 3) what specific outcome I'm offering. Then draft 3 variants — formal, peer-to-peer, blunt.",
  },
  {
    mode: "3 Angles",
    raw: "explain machine learning",
    rewritten:
      "Explain machine learning from 3 angles for a non-technical founder: (1) the 90-second elevator pitch, (2) the analogy a 10-year-old would get, (3) the one technical detail that changes how they hire engineers.",
  },
]

export function HeroDemo() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"idle" | "rewriting" | "done">("idle")

  useEffect(() => {
    const cycle = async () => {
      setPhase("idle")
      await wait(1400)
      setPhase("rewriting")
      await wait(1100)
      setPhase("done")
      await wait(3200)
      setIndex((i) => (i + 1) % PAIRS.length)
    }
    cycle()
  }, [index])

  const current = PAIRS[index]

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow behind */}
      <div
        aria-hidden
        className="absolute -inset-8 opacity-60 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,94,58,0.18), transparent 70%)" }}
      />

      <div className="relative glass-elevated overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border-soft)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="ml-3 text-xs text-[var(--text-3)] font-mono">prism / workspace</div>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-[var(--text-3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] pulse-soft" />
            live
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Input */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-2 font-medium">
              Your prompt
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`raw-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl bg-[var(--surface-2)] border border-[var(--border-soft)] px-4 py-3 text-sm text-[var(--text-2)] font-mono"
              >
                {current.raw}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mode pill */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mode-${index}-${phase}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
                style={
                  phase === "rewriting"
                    ? {
                        background: "var(--accent-soft)",
                        borderColor: "rgba(255,94,58,0.3)",
                        color: "var(--accent)",
                      }
                    : phase === "done"
                    ? {
                        background: "rgba(74,222,128,0.08)",
                        borderColor: "rgba(74,222,128,0.3)",
                        color: "var(--success)",
                      }
                    : {
                        background: "var(--surface-2)",
                        borderColor: "var(--border-soft)",
                        color: "var(--text-3)",
                      }
                }
              >
                {phase === "rewriting" ? (
                  <>
                    <Wand2 className="w-3 h-3 animate-spin" />
                    Applying {current.mode}…
                  </>
                ) : phase === "done" ? (
                  <>
                    <Sparkles className="w-3 h-3" />
                    {current.mode} applied
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3 h-3" />
                    {current.mode}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Output */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--accent)] mb-2 font-medium">
              Rewritten
            </p>
            <div className="relative rounded-xl border px-4 py-3 min-h-[100px] overflow-hidden"
              style={{
                background: phase === "done" ? "var(--accent-soft)" : "var(--surface-2)",
                borderColor: phase === "done" ? "rgba(255,94,58,0.25)" : "var(--border-soft)",
                transition: "all 400ms ease",
              }}
            >
              <AnimatePresence mode="wait">
                {phase === "done" ? (
                  <motion.p
                    key={`out-${index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="text-sm text-[var(--text-1)] leading-relaxed"
                  >
                    {current.rewritten}
                  </motion.p>
                ) : phase === "rewriting" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="h-3 rounded shimmer bg-[var(--surface-3)]" style={{ width: "92%" }} />
                    <div className="h-3 rounded shimmer bg-[var(--surface-3)]" style={{ width: "78%" }} />
                    <div className="h-3 rounded shimmer bg-[var(--surface-3)]" style={{ width: "85%" }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="text-sm text-[var(--text-3)] italic"
                  >
                    Click a mode to rewrite…
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {PAIRS.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 20 : 6,
                  background: i === index ? "var(--accent)" : "var(--border-mid)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}
