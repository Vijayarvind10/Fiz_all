import type { Metadata } from "next"

import "@fontsource/playfair-display/400.css"
import "@fontsource/playfair-display/600.css"
import "@fontsource/playfair-display/700.css"
import "@fontsource/red-hat-text/400.css"
import "@fontsource/red-hat-text/500.css"
import "@fontsource/red-hat-text/600.css"
import "@fontsource/red-hat-text/700.css"
import "@fontsource/space-mono/400.css"
import "@fontsource/space-mono/700.css"

import { HeaderNav } from "@/components/header-nav"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Life Admin Atelier",
  description:
    "Your curated control room for renewals, deadlines, and calm adult-life rituals."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen overflow-x-hidden bg-[--color-parchment] font-[var(--font-sans)] text-[--color-ink] antialiased">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-30 vintage-aurora" />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 vintage-vignette" />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 vintage-stripes opacity-80" />

        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px] blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% -10%, rgba(112,79,48,0.25), transparent 65%), radial-gradient(circle at 20% 20%, rgba(90,128,178,0.22), transparent 55%), radial-gradient(circle at 80% 18%, rgba(246,192,141,0.2), transparent 60%)"
          }}
        />

        <HeaderNav />

        <main className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-32 md:px-12">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-40 rounded-[5rem] opacity-80 blur-3xl" style={{
            background:
              "linear-gradient(120deg, rgba(255,249,239,0.88), rgba(231,201,160,0.24), rgba(119,140,180,0.18))"
          }} />
          {children}
        </main>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
