"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react"

function PrismMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" className="w-9 h-9">
      <defs>
        <linearGradient id="signup-grad" x1="0" y1="0" x2="28" y2="28">
          <stop offset="0" stopColor="#FF7A5C" />
          <stop offset="1" stopColor="#E8401C" />
        </linearGradient>
      </defs>
      <path d="M14 3 L25 23 L3 23 Z" fill="url(#signup-grad)" stroke="#FF5E3A" strokeWidth="0.5" />
      <circle cx="14" cy="14" r="1.8" fill="#FAFAFA" />
    </svg>
  )
}

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)" }}>
        <div className="text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: "var(--success)" }} />
          </div>
          <h2 className="font-display text-3xl text-[var(--text-1)] mb-3">Check your inbox</h2>
          <p className="text-[var(--text-2)] text-sm leading-relaxed">
            We sent a confirmation link to{" "}
            <span className="accent-text font-medium">{email}</span>.
            <br />Click it to activate your account.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)" }}>
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2.5">
            <PrismMark />
            <span className="font-display text-2xl text-[var(--text-1)]">
              Prism<span className="accent-text">.</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-elevated p-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl text-[var(--text-1)] mb-1.5">Create your account</h1>
            <p className="text-sm text-[var(--text-3)]">
              30 rewrites free · No credit card needed
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-all"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create free account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="accent-text hover:opacity-80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/20 mt-6">
          Built solo · Shipped honest · v0.1
        </p>
      </div>
    </div>
  )
}
