"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Zap } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const isLanding = pathname === "/"

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <nav
          className="glass flex items-center justify-between px-6 py-3"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </span>
            <span className="gradient-text">Prism</span>
          </Link>

          {/* Nav links (landing only) */}
          {isLanding && (
            <ul className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
              <li>
                <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[var(--text-primary)] transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          )}

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Start free</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
