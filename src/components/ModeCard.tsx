import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface ModeCardProps {
  icon: LucideIcon
  label: string
  description: string
  color: string
  selected?: boolean
  onClick?: () => void
}

export function ModeCard({ icon: Icon, label, description, color, selected, onClick }: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "glass glass-hover w-full text-left p-4 transition-all duration-200",
        selected && "border-[var(--primary)] bg-[rgba(139,92,246,0.08)] shadow-[0_0_20px_rgba(139,92,246,0.15)]"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: color + "22", color }}
        >
          <Icon className="w-4 h-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">{label}</p>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  )
}
