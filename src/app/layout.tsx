import type { Metadata } from "next"
import { Playfair_Display, Red_Hat_Text, Space_Mono } from "next/font/google"

import { HeaderNav } from "@/components/header-nav"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const redHat = Red_Hat_Text({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Life Admin Control Center",
  description:
    "Stay ahead of lease notices, renewals, licenses, insurance, and health checkups with calm, timely guidance.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${redHat.variable} ${spaceMono.variable} antialiased text-foreground`}
      >
        <div className="pointer-events-none fixed inset-0 -z-30">
          <div className="aurora-grid" />
        </div>
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-20 h-80 bg-[radial-gradient(circle_at_top,rgba(228,185,133,0.58),rgba(253,242,223,0))] opacity-90 mix-blend-multiply" />
        <div className="pointer-events-none fixed inset-x-10 bottom-0 -z-10 hidden h-64 rounded-[6rem] antique-stripes opacity-80 blur-2xl md:block" />
        <HeaderNav />
        <main className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-32 md:px-10">
          <div className="vignette pointer-events-none absolute inset-x-0 -top-16 -z-10 h-24 rounded-[3rem] border border-[#c9a373]/50 bg-[#fff4e2]/60 blur-xl" />
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
