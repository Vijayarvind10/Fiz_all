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

const tickerItems = [
  "Lease notices", "Passport renewals", "Insurance cutoffs", "Visa steps",
  "Car registration", "Dental checkups", "License renewals", "Rent reminders",
]

export const HeaderNav = () => {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-none absolute inset-0 mx-auto h-[120%] w-[92%] -translate-y-6 rounded-[4rem] border border-[#b9895c]/35 bg-gradient-to-b from-[#fff9ef]/70 via-[#f3d8b3]/20 to-transparent opacity-90 blur-2xl" />
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-[#a77755]/40 bg-[#fdf2df]/88 px-4 py-3 shadow-[0_12px_30px_rgba(94,56,32,0.15)] backdrop-blur-md md:px-6 md:py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full border border-[#a77755]/40 bg-[#fff7ea]/90 px-3 py-1.5 text-sm font-semibold text-[#3c1f16] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:border-[#8f6040]/60"
        >
          <motion.span
            className="vinyl-orbit rounded-full border border-[#8f6040]/40 bg-[#f3d8b3]/80 p-1.5 text-[#6c3a25]"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck className="size-4" />
          </motion.span>
          <span className="font-semibold uppercase tracking-[0.18em] text-[11px] text-[#4a2a1d]">
            Life Admin Atelier
          </span>
        </Link>

        <nav className="hidden items-center gap-3 text-sm font-medium text-[#623625] md:flex">
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
                  "relative rounded-full px-3 py-1.5 transition",
                  active
                    ? "bg-[#7c3f2d] text-[#fff7ef] shadow-[0_6px_14px_rgba(81,34,20,0.35)]"
                    : "text-[#754934] hover:bg-[#f8e4ca] hover:text-[#452319]",
                )}
              >
                <span className="ink-shadow">{link.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-[#cba578]/60"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
          <Button className="rounded-full border border-[#caa06e]/60 bg-[#432015] px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#fcefe0] shadow-[0_10px_22px_rgba(61,28,16,0.3)] transition hover:bg-[#5a2b1c]">
            Upgrade to Pro
          </Button>
        </motion.div>
      </div>

      <div className="mx-auto mt-2 hidden w-full max-w-4xl overflow-hidden rounded-full border border-[#b98c62]/40 bg-[#fff4e2]/80 px-4 py-1 md:block">
        <div className="deadline-ticker">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="tracking-[0.32em]">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="border-y border-[#c9a373]/50 bg-[#fff4e2]/85 backdrop-blur md:hidden">
        <nav className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d4331] [scrollbar-width:none]">
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
                  "whitespace-nowrap rounded-full border px-3 py-1 transition",
                  active
                    ? "border-[#7c3f2d] bg-[#7c3f2d] text-[#fff7ef]"
                    : "border-[#e4c59f]/60 bg-[#fff9ef]/80",
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
