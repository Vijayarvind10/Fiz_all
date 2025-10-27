"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
]

export const HeaderNav = () => {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:shadow-md"
        >
          <ShieldCheck className="size-4 text-indigo-500" />
          Life Admin Control Center
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition",
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
          <Button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
            Upgrade to Pro
          </Button>
        </motion.div>
      </div>

      <div className="border-t border-slate-200 bg-white/80 backdrop-blur-md md:hidden">
        <nav className="mx-auto flex w-full max-w-6xl items-center gap-3 overflow-x-auto px-4 py-3 text-xs font-medium text-slate-600 [scrollbar-width:none]">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1 transition",
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white/80 text-slate-600 ring-1 ring-slate-200",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
