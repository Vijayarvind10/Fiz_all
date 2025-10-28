"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Orbit, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/onboarding", label: "Ritual" },
  { href: "/dashboard", label: "Timeline" },
  { href: "/settings", label: "Settings" },
]

const tickerItems = [
  "Lease notices", "Passport renewals", "Insurance cutoffs", "Visa paperwork",
  "Car registration", "Dental checkups", "Late fee waivers", "Proof archives",
]

export const HeaderNav = () => {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-4 sm:px-6">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-[2.5rem] border border-[#b98c62]/45 bg-[rgba(255,248,238,0.82)] px-4 py-3 shadow-[0_22px_60px_rgba(48,24,15,0.22)] backdrop-blur-xl md:px-6 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full border border-[#a87a56]/45 bg-[rgba(255,247,234,0.9)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#422519] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:border-[#8f6040]/70"
          >
            <motion.span
              className="flex size-8 items-center justify-center rounded-full border border-[#c69b72]/50 bg-[rgba(243,216,179,0.9)] text-[#6a3d27] shadow-[0_10px_20px_rgba(86,47,29,0.22)]"
              animate={{ rotate: [0, -12, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Orbit className="size-4" />
            </motion.span>
            <span>Life Admin Atelier</span>
          </Link>

          <nav className="hidden items-center gap-2 text-sm font-medium text-[#5a3422] md:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === link.href : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative overflow-hidden rounded-full border border-transparent px-4 py-2 transition",
                    active
                      ? "border-[#8f6040]/60 bg-[#412215] text-[#fef5e8] shadow-[0_12px_26px_rgba(45,23,14,0.28)]"
                      : "hover:border-[#caa06e]/50 hover:bg-[rgba(253,242,223,0.85)]",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="atelier-pill"
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-[#caa06e]/70"
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
            <Button className="rounded-full border border-[#caa06e]/70 bg-[#452217] px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#fef4e6] shadow-[0_14px_28px_rgba(42,17,10,0.36)] hover:bg-[#5d2f1e]">
              Upgrade to Pro
            </Button>
          </motion.div>
        </div>

        <div className="hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#68402b] md:flex">
          <span className="flex items-center gap-2 rounded-full border border-[#cba578]/60 bg-[rgba(248,228,202,0.8)] px-3 py-1">
            <Sparkles className="size-3" />
            Atelier ticker
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="deadline-ticker deadline-ticker--scroll">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-[2rem] border border-[#b98c62]/50 bg-[rgba(255,247,234,0.9)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6d4331] shadow-[0_12px_32px_rgba(54,28,16,0.16)] backdrop-blur md:hidden">
        <div className="deadline-ticker deadline-ticker--scroll">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-mobile-${index}`}>{item}</span>
          ))}
        </div>
        <nav className="mt-2 flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === link.href : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-full border px-3 py-1",
                  active
                    ? "border-[#7c3f2d] bg-[#7c3f2d] text-[#fff7ef]"
                    : "border-[#d6b287]/60 bg-[rgba(255,249,239,0.9)]",
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
