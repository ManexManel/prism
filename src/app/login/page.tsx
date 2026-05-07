"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ArrowRight, Loader2 } from "lucide-react"

function PrismMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-9 h-9">
      <defs>
        <linearGradient id="login-grad" x1="0" y1="0" x2="28" y2="28">
          <stop offset="0" stopColor="#FF7A5C" />
          <stop offset="1" stopColor="#E8401C" />
        </linearGradient>
      </defs>
      <path d="M14 3 L25 23 L3 23 Z" fill="url(#login-grad)" stroke="#FF5E3A" strokeWidth="0.5" />
      <circle cx="14" cy="14" r="1.8" fill="#FAFAFA" />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/workspace")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="mesh-bg" />

      <div className="relative w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2.5">
            <PrismMark />
            <span className="font-display text-2xl text-[var(--text-1)]">
              Prism<span className="accent-text">.</span>
            </span>
          </Link>
        </div>

        <div className="glass-elevated p-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl text-[var(--text-1)] mb-1.5">Welcome back</h1>
            <p className="text-sm text-[var(--text-3)]">Sign in to your Prism account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-3)] mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-[var(--surface-1)] border border-[var(--border-soft)] rounded-xl px-4 py-3 text-sm text-[var(--text-1)] placeholder:text-[var(--text-4)] focus:outline-none focus:border-[var(--accent)] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-3)] mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[var(--surface-1)] border border-[var(--border-soft)] rounded-xl px-4 py-3 text-sm text-[var(--text-1)] placeholder:text-[var(--text-4)] focus:outline-none focus:border-[var(--accent)] transition-all"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign in <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-3)] mt-6">
            No account?{" "}
            <Link href="/signup" className="accent-text hover:opacity-80 font-medium transition-opacity">
              Create one free →
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[var(--text-4)] mt-6">
          Built solo · Shipped honest · v0.1
        </p>
      </div>
    </div>
  )
}
