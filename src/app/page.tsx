"use client"

import { motion } from "framer-motion"
import { ArrowRight, CalendarCheck2, ClipboardList, ShieldPlus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const proofPoints = [
  {
    title: "Lease & housing",
    description:
      "Notice countdowns, scripted landlord letters, and deposit-proof reminders keep rent calm.",
  },
  {
    title: "IDs & travel",
    description:
      "Driver’s license, passport, visa, and OPT renewals mapped with prep checklists and timing.",
  },
  {
    title: "Money & insurance",
    description:
      "Insurance re-shopping, bank paperwork, and negotiation scripts exactly when they save money.",
  },
]

const howItWorks = [
  "Tell us about housing, ID, car, health, and anything else with deadlines.",
  "We build your Life Timeline with urgency, cadence, and prepared scripts.",
  "We warn you before it gets expensive and give you the exact words to send.",
]

const pricing = [
  {
    tier: "Free",
    price: "$0",
    tagline: "Gather your life deadlines in one calm place.",
    bullets: [
      "Personal timeline dashboard",
      "Email reminders 30/7/1 days out",
      "Copyable action templates",
    ],
  },
  {
    tier: "Pro",
    price: "$8/mo",
    tagline: "Full atelier service with archival proof.",
    bullets: [
      "Urgent SMS + email alerts",
      "Auto-filled letters with timestamps",
      "Secure document vault & custom obligations",
    ],
    highlighted: true,
  },
]

const rotatingGlyphs = ["Deadlines", "Letters", "Renewals", "Proof"]

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-10">
      <section className="relative grid gap-12 overflow-hidden rounded-[3.5rem] border border-[#caa06e]/55 bg-[rgba(255,247,234,0.92)] px-6 py-14 shadow-[0_28px_75px_rgba(45,21,12,0.22)] backdrop-blur md:grid-cols-[1.15fr_1fr] md:px-16 md:py-18 vintage-panel">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-14 hidden h-48 w-48 -rotate-6 rounded-full border border-dashed border-[#caa06e]/55 bg-[rgba(255,243,225,0.9)] opacity-70 blur-sm md:block" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-10 hidden size-44 place-items-center rounded-full border border-[#9f694a]/50 bg-[rgba(246,217,177,0.9)] text-[10px] font-semibold uppercase tracking-[0.36em] text-[#603a27] shadow-[0_18px_40px_rgba(95,58,34,0.24)] md:grid"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, -10, 6, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Atelier stamp
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="aurora-pin">
            <span className="size-2 rounded-full bg-[#f6d9b1]" />
            Calm deadline stewardship
          </span>

          <motion.h1
            className="text-5xl font-semibold leading-tight text-[#2f1a12] md:text-6xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            Never miss an adult-life deadline again.
          </motion.h1>

          <p className="text-lg leading-relaxed text-[#5e3927]">
            Life Admin Atelier keeps rent, licenses, visas, insurance, and health rituals under watch. We warn you before it gets
            expensive and hand you the exact script — you simply send.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-full border border-[#9f694a]/60 bg-[#412215] px-7 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#fff5e7] shadow-[0_16px_30px_rgba(51,24,13,0.32)] hover:bg-[#5d2f1e]"
            >
              <Link href="/onboarding" className="flex items-center gap-3">
                Begin the ritual
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full border border-[#caa06e]/70 bg-[rgba(255,247,234,0.88)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#6a3e2a] shadow-[0_12px_24px_rgba(109,67,49,0.18)] hover:bg-[rgba(248,228,202,0.9)]"
            >
              <Link href="/dashboard">Browse the timeline</Link>
            </Button>
          </div>

          <div className="grid gap-3 text-sm text-[#5a3422] sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#d9b58b]/60 bg-[rgba(255,243,225,0.9)] px-4 py-3">
              <ShieldPlus className="size-5 text-[#7c3f2d]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7a452d]">
                  Proof and prep
                </p>
                <p>Every letter, script, and checklist is ready before you need it.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#d9b58b]/60 bg-[rgba(255,243,225,0.9)] px-4 py-3">
              <CalendarCheck2 className="size-5 text-[#7c3f2d]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7a452d]">
                  Cadence locked
                </p>
                <p>Renewals & reminders at 30/7/1 days so nothing sneaks up on you.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex flex-col gap-6"
        >
          <motion.div
            className="deadline-glyph self-end"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            Atelier
          </motion.div>

          <Card className="vintage-card shadow-none">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.32em] text-[#7a452d]">
                <span>Sample timeline preview</span>
                <span className="text-[#b2774d]">Week 07</span>
              </div>
              <div className="space-y-4 text-sm text-[#523223]">
                <SampleCard
                  index={0}
                  title="Lease notice due in 18 days"
                  body="We’ll generate the formal move-out letter. You just send it."
                  accent="bg-[rgba(251,224,210,0.85)] text-[#8f3d2d]"
                />
                <SampleCard
                  index={1}
                  title="Driver’s license expires in 42 days"
                  body="Check your state checklist before booking – we’ve gathered the prep."
                  accent="bg-[rgba(246,228,188,0.85)] text-[#7a531d]"
                />
                <SampleCard
                  index={2}
                  title="Book a dentist cleaning"
                  body="Use the call script to schedule in under 60 seconds."
                  accent="bg-[rgba(230,240,216,0.85)] text-[#486135]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="hidden flex-col items-end gap-2 text-[10px] font-semibold uppercase tracking-[0.38em] text-[#7a452d] md:flex">
            <span>Deadlines always in orbit</span>
            <div className="relative w-full overflow-hidden rounded-full border border-[#caa06e]/55 bg-[rgba(255,243,225,0.9)] px-4 py-1">
              <div className="deadline-ticker deadline-ticker--scroll">
                {[...rotatingGlyphs, ...rotatingGlyphs].map((word, index) => (
                  <span key={`${word}-${index}`}>{word}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        {proofPoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            <Card className="vintage-card h-full shadow-none">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-xl font-semibold text-[#321b12]">{point.title}</h3>
                <p className="text-sm leading-relaxed text-[#66402a]">{point.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="relative overflow-hidden space-y-8 rounded-[3rem] border border-[#caa06e]/55 bg-[rgba(255,247,234,0.9)] px-6 py-12 shadow-[0_20px_55px_rgba(45,21,12,0.2)] backdrop-blur md:px-16">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-[#b98c62]/40 bg-[rgba(246,217,177,0.3)] blur-3xl" />
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.36em] text-[#734428]">
          <ClipboardList className="size-4 text-[#8f5b3b]" />
          How it works
        </div>
        <h2 className="text-3xl font-semibold text-[#2f1a12] md:text-[2.25rem]">
          Your personal timeline in three curated steps.
        </h2>
        <ol className="grid gap-6 text-sm text-[#553323] md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <li
              key={item}
              className="vintage-card space-y-3 border border-[#d9b58b]/70 px-6 py-6 shadow-none"
            >
              <span className="inline-flex items-center gap-3 rounded-full border border-[#cba578]/60 bg-[rgba(243,216,179,0.8)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a]">
                Step {index + 1}
              </span>
              <p className="leading-relaxed">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        {pricing.map((plan) => (
          <Card
            key={plan.tier}
            className={cn(
              "vintage-card relative h-full border border-[#caa06e]/60 shadow-[0_18px_40px_rgba(52,21,12,0.18)]",
              plan.highlighted && "animate-panel-glow border-[#b37545]/70 bg-[rgba(245,228,204,0.95)]",
            )}
          >
            <CardContent className="space-y-5 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#7a452d]">
                    {plan.tier}
                  </p>
                  <h3 className="text-3xl font-semibold text-[#2f1a12]">{plan.price}</h3>
                </div>
                <span className="rounded-full border border-[#cba578]/60 bg-[rgba(248,228,202,0.86)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a]">
                  {plan.highlighted ? "Recommended" : "Start here"}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#644030]">{plan.tagline}</p>
              <ul className="space-y-3 text-sm text-[#4c2d1f]">
                {plan.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#8f5b3b]" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "w-full rounded-full border border-[#9f694a]/60 px-6 py-2 text-xs font-semibold uppercase tracking-[0.28em]",
                  plan.highlighted
                    ? "bg-[#412215] text-[#fff5e7] shadow-[0_14px_32px_rgba(45,20,12,0.32)] hover:bg-[#5d2f1e]"
                    : "bg-[rgba(255,247,234,0.92)] text-[#5f3623] shadow-[0_10px_24px_rgba(61,32,20,0.18)] hover:bg-[rgba(248,228,202,0.94)]",
                )}
              >
                {plan.highlighted ? "Unlock Atelier Pro" : "Start your timeline"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

function SampleCard({
  index,
  title,
  body,
  accent,
}: {
  index: number
  title: string
  body: string
  accent: string
}) {
  return (
    <div className="rounded-[18px] border border-[#e0c19b]/70 bg-[rgba(255,249,239,0.9)] p-4 shadow-[0_12px_32px_rgba(64,34,18,0.1)]">
      <div className={cn(
        "inline-flex items-center gap-3 rounded-full border border-[#d4ad84]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]",
        accent,
      )}>
        Obligation {index + 1}
      </div>
      <h4 className="mt-3 text-base font-semibold text-[#361e14]">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-[#6a412d]">{body}</p>
    </div>
  )
}
