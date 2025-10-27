import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { HeaderNav } from "@/components/header-nav"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-100 via-slate-50 to-white" />
        <div className="fixed inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.18)_0%,rgba(226,232,240,0)_75%)]" />
        <HeaderNav />
        <main className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-24 md:px-8">
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
