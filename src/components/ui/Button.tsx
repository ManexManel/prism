"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"

    const variants = {
      primary:
        "bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] active:translate-y-0",
      ghost:
        "bg-transparent border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]",
      danger:
        "bg-gradient-to-r from-red-600 to-red-500 text-white hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5 text-[0.9375rem]",
      lg: "px-8 py-3.5 text-base",
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
export { Button }
