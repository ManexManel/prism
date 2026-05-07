"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Toast } from "@/components/Toast"
import { Zap, ArrowLeft, User, CreditCard, Trash2 } from "lucide-react"

interface Profile {
  email: string
  plan: string
  credits: number
  created_at: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading]   = useState(true)
  const [toast, setToast]       = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }

      const { data } = await supabase
        .from("profiles")
        .select("email, plan, credits, created_at")
        .eq("id", user.id)
        .single()

      setProfile(data ?? { email: user.email ?? "", plan: "free", credits: 30, created_at: user.created_at })
      setLoading(false)
    }
    load()
  }, [router])

  async function handleDeleteHistory() {
    if (!confirm("Delete all your rewrite history? This cannot be undone.")) return
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("rewrites").delete().eq("user_id", user.id)
    setToast({ message: "History deleted", type: "success" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/workspace" className="glass glass-hover p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="font-bold gradient-text">Prism</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>

        {/* Account card */}
        <div className="glass-elevated p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-4 h-4 text-violet-400" />
            <h2 className="font-semibold text-[var(--text-primary)]">Account</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Email</span>
              <span className="text-[var(--text-secondary)]">{profile?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Plan</span>
              <span className={`font-semibold capitalize ${profile?.plan === "pro" ? "text-violet-400" : "text-[var(--text-secondary)]"}`}>
                {profile?.plan}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Credits remaining</span>
              <span className="text-[var(--text-secondary)]">{profile?.credits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Member since</span>
              <span className="text-[var(--text-secondary)]">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Upgrade */}
        {profile?.plan === "free" && (
          <div className="glass p-6 border-[var(--primary)] bg-[rgba(139,92,246,0.05)]">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-4 h-4 text-violet-400" />
              <h2 className="font-semibold text-[var(--text-primary)]">Upgrade to Pro</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Unlimited rewrites, full history, voice input — €12/month.
            </p>
            <Button size="sm">Upgrade to Pro</Button>
          </div>
        )}

        {/* Danger zone */}
        <div className="glass p-6 border-red-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Trash2 className="w-4 h-4 text-red-400" />
            <h2 className="font-semibold text-[var(--text-primary)]">Danger zone</h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Delete all saved rewrite history permanently.
          </p>
          <Button variant="danger" size="sm" onClick={handleDeleteHistory}>
            Delete all history
          </Button>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
