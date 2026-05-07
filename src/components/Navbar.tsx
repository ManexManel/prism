"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const isLanding = pathname === "/"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,11,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between" aria-label="Main">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <PrismMark />
          <span className="font-display text-[19px] tracking-tight text-[var(--text-1)]">
            Prism<span className="accent-text">.</span>
          </span>
        </Link>

        {/* Center nav (landing only) */}
        {isLanding && (
          <ul className="hidden md:flex items-center gap-8 text-[13px] text-[var(--text-2)] font-medium">
            <li><a href="#features" className="hover:text-[var(--text-1)] transition-colors">Modes</a></li>
            <li><a href="#how-it-works" className="hover:text-[var(--text-1)] transition-colors">How it works</a></li>
            <li><a href="#pricing" className="hover:text-[var(--text-1)] transition-colors">Pricing</a></li>
            <li><Link href="/changelog" className="hover:text-[var(--text-1)] transition-colors">Changelog</Link></li>
            <li><Link href="/roadmap" className="hover:text-[var(--text-1)] transition-colors">Roadmap</Link></li>
          </ul>
        )}

        {/* Right CTAs */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-[13px] font-medium text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary !py-2 !px-4 !text-[13px]">
            Start free
          </Link>
        </div>
      </nav>
    </header>
  )
}

/* Custom Prism logo mark — geometric refracting triangle */
function PrismMark() {
  return (
    <span className="relative w-7 h-7 flex items-center justify-center">
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
        <defs>
          <linearGradient id="prism-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF7A5C" />
            <stop offset="1" stopColor="#E8401C" />
          </linearGradient>
        </defs>
        <path
          d="M14 3 L25 23 L3 23 Z"
          fill="url(#prism-grad)"
          stroke="#FF5E3A"
          strokeWidth="0.5"
        />
        <path d="M14 3 L14 23" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        <circle cx="14" cy="14" r="1.5" fill="#FAFAFA" />
      </svg>
    </span>
  )
}
