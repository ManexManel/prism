import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  hoverable?: boolean
}

function Card({ className, elevated, hoverable, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass p-6",
        elevated && "glass-elevated",
        hoverable && "glass-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold text-[var(--text-primary)]", className)} {...props}>
      {children}
    </h3>
  )
}

function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-[var(--text-secondary)] text-sm leading-relaxed", className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardContent }
