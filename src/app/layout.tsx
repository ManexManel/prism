import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Prism — Write better prompts, instantly",
  description:
    "Prism rewrites your AI prompts in 6 modes so you get exactly the response you want. Works everywhere with the Chrome extension.",
  keywords: ["prompt rewriter", "AI prompts", "ChatGPT", "productivity", "chrome extension"],
  openGraph: {
    title: "Prism — Write better prompts, instantly",
    description: "Select any text, hit rewrite. Get better AI responses every time.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <div className="mesh-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
