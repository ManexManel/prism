"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  type?: "success" | "error"
  onClose: () => void
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-[100] glass-elevated flex items-center gap-3 px-4 py-3 max-w-sm transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
      )}
      <p className="text-sm text-[var(--text-primary)] flex-1">{message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300) }}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-1"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
