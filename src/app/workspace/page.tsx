"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { ModeCard } from "@/components/ModeCard"
import { Toast } from "@/components/Toast"
import {
  Zap, Wand2, MessageSquare, Layers, Mic, ExpandIcon,
  Copy, RotateCcw, LogOut, History, Settings, ClipboardPaste,
  Sparkles
} from "lucide-react"

/* ─── Modes config ───────────────────────────────────────────────────── */
const MODES = [
  { key: "direct",     label: "Direct",     icon: Zap,           description: "Sharpen and clarify instantly",          color: "#8b5cf6" },
  { key: "diagnostic", label: "Diagnostic", icon: Wand2,         description: "Detect and fix what's vague",            color: "#6366f1" },
  { key: "dialogue",   label: "Dialogue",   icon: MessageSquare, description: "Structure as a back-and-forth prompt",   color: "#a78bfa" },
  { key: "angles",     label: "3 Angles",   icon: Layers,        description: "Get 3 different framings",               color: "#818cf8" },
  { key: "tone",       label: "Tone Shift", icon: Sparkles,      description: "Expert, authoritative rewrite",          color: "#c4b5fd" },
  { key: "expand",     label: "Expand",     icon: ExpandIcon,    description: "Add role, context, format requirements", color: "#7c3aed" },
]

interface HistoryItem {
  id: string
  original: string
  rewritten: string
  mode: string
  mode_label: string
  created_at: string
}

export default function WorkspacePage() {
  const router = useRouter()
  const [prompt, setPrompt]         = useState("")
  const [result, setResult]         = useState("")
  const [mode, setMode]             = useState("direct")
  const [loading, setLoading]       = useState(false)
  const [toast, setToast]           = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [history, setHistory]       = useState<HistoryItem[]>([])
  const [historyOpen, setHistoryOpen] = useState(false)
  const [recording, setRecording]   = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef              = useRef<any>(null)

  /* Reload history (callable, no flicker dep) */
  const loadHistory = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("rewrites")
      .select("id, original, rewritten, mode, mode_label, created_at")
      .order("created_at", { ascending: false })
      .limit(50)
    if (data) setHistory(data)
  }, [])

  useEffect(() => { loadHistory() }, [loadHistory])

  /* Delete a single history entry */
  const deleteHistoryItem = useCallback(async (id: string) => {
    const supabase = createClient()
    await supabase.from("rewrites").delete().eq("id", id)
    setHistory((h) => h.filter((it) => it.id !== id))
  }, [])

  /* Rewrite */
  const handleRewrite = useCallback(async () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setResult("")

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      setResult(data.result)
      // Refresh history once after successful rewrite (no flicker)
      loadHistory()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Rewrite failed"
      setToast({ message, type: "error" })
    } finally {
      setLoading(false)
    }
  }, [prompt, mode, loading, loadHistory])

  /* Copy to clipboard */
  const copyResult = useCallback(async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setToast({ message: "Copied to clipboard!", type: "success" })
  }, [result])

  /* Replace input with result */
  const replaceWithResult = useCallback(() => {
    if (!result) return
    setPrompt(result)
    setResult("")
  }, [result])

  /* Paste from clipboard */
  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setPrompt(text)
    } catch {
      setToast({ message: "Could not read clipboard", type: "error" })
    }
  }, [])

  /* Voice input */
  const toggleVoice = useCallback(() => {
    type AnyWindow = Window & {
      SpeechRecognition?: new () => SpeechRecognitionInstance
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type SpeechRecognitionInstance = any

    const win = (typeof window !== "undefined" ? window : null) as AnyWindow | null
    const SR = win?.SpeechRecognition ?? win?.webkitSpeechRecognition ?? null

    if (!SR) {
      setToast({ message: "Voice input not supported in this browser", type: "error" })
      return
    }

    if (recording) {
      recognitionRef.current?.stop()
      setRecording(false)
      return
    }

    const recognition = new SR()
    // Auto-detect language from browser
    recognition.lang = typeof navigator !== "undefined" ? (navigator.language || "en-US") : "en-US"
    recognition.interimResults = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript
      setPrompt((prev) => (prev ? prev + " " + text : text))
    }
    recognition.onend = () => setRecording(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognitionRef.current = recognition as any
    recognition.start()
    setRecording(true)
  }, [recording])

  /* Sign out */
  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const charCount = prompt.length
  const wordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <header className="glass border-b border-[var(--border-subtle)] px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="gradient-text text-base">Prism</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            aria-pressed={historyOpen}
            className="flex items-center gap-2 glass glass-hover px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            History
          </button>
          <Link href="/settings">
            <button className="glass glass-hover p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </Link>
          <button
            onClick={signOut}
            className="glass glass-hover p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── History sidebar ───────────────────────────────────── */}
        {historyOpen && (
          <aside className="w-full md:w-72 shrink-0 border-r border-[var(--border-subtle)] flex flex-col overflow-hidden absolute md:relative inset-0 z-30 bg-[var(--bg-base)] md:bg-transparent">
            <div className="p-4 border-b border-[var(--border-subtle)]">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Recent rewrites</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {history.length === 0 && (
                <p className="text-xs text-[var(--text-muted)] p-3 text-center">No rewrites yet</p>
              )}
              {history.map((item) => (
                <div key={item.id} className="group glass glass-hover p-3 rounded-lg relative">
                  <button
                    onClick={() => {
                      setPrompt(item.original)
                      setResult(item.rewritten)
                      setMode(item.mode)
                    }}
                    className="w-full text-left"
                  >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-violet-400 uppercase tracking-wide">
                      {item.mode_label}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {new Date(item.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed pr-5">
                    {item.original}
                  </p>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteHistoryItem(item.id) }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-[var(--text-muted)] hover:text-red-400 transition-all p-1"
                    aria-label="Delete this rewrite"
                    title="Delete"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* ── Main workspace ────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Mode selector */}
            <section aria-label="Rewrite mode">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                Mode
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {MODES.map((m) => (
                  <ModeCard
                    key={m.key}
                    icon={m.icon}
                    label={m.label}
                    description={m.description}
                    color={m.color}
                    selected={mode === m.key}
                    onClick={() => setMode(m.key)}
                  />
                ))}
              </div>
            </section>

            {/* Input / Output grid */}
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Input */}
              <section aria-label="Your prompt">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                    Your prompt
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {wordCount}w · {charCount}c
                    </span>
                    <button
                      onClick={pasteFromClipboard}
                      className="glass glass-hover p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      aria-label="Paste from clipboard"
                    >
                      <ClipboardPaste className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={toggleVoice}
                      aria-pressed={recording}
                      className={`glass glass-hover p-1.5 rounded-md transition-colors ${
                        recording
                          ? "text-red-400 border-red-500/30 animate-pulse"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                      aria-label={recording ? "Stop voice input" : "Start voice input"}
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste your prompt here, or speak it with the mic…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleRewrite()
                  }}
                  className="input-glass resize-none h-64 leading-relaxed"
                  aria-label="Prompt input"
                />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[10px] text-[var(--text-muted)]">
                    Ctrl+Enter / ⌘+Enter to rewrite
                  </p>
                  <Button
                    onClick={handleRewrite}
                    loading={loading}
                    disabled={!prompt.trim()}
                    className="gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    Rewrite
                  </Button>
                </div>
              </section>

              {/* Result */}
              <section aria-label="Rewritten prompt">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
                    Result
                  </p>
                  {result && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={replaceWithResult}
                        className="glass glass-hover p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="Replace input with result"
                        title="Replace input with result"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={copyResult}
                        className="glass glass-hover p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="Copy result"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <div
                  className={`glass h-64 p-4 rounded-xl overflow-y-auto text-sm leading-relaxed transition-all duration-300 ${
                    loading
                      ? "text-[var(--text-muted)] italic"
                      : result
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)]"
                  } ${result ? "border-[var(--primary)] bg-[rgba(139,92,246,0.05)]" : ""}`}
                  aria-live="polite"
                  aria-label="Rewritten prompt output"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  ) : result ? (
                    <pre className="whitespace-pre-wrap font-sans">{result}</pre>
                  ) : (
                    <span>Your rewritten prompt will appear here…</span>
                  )}
                </div>
                {result && (
                  <div className="mt-3 flex justify-end">
                    <Button onClick={copyResult} variant="ghost" size="sm">
                      <Copy className="w-3.5 h-3.5" />
                      Copy result
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
