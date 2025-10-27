"use client"

import { motion } from "framer-motion"
import { ArrowRight, CalendarCheck2, ClipboardList, ShieldPlus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const proofPoints = [
  {
    title: "Lease & housing",
    description:
      "We count down to notice deadlines and generate the exact letter you need to send.",
  },
  {
    title: "IDs & travel",
    description:
      "Driver’s license, passport, work authorization — all tracked so you never scramble again.",
  },
  {
    title: "Money & insurance",
    description:
      "Renewals and negotiation scripts surface right when they save the most cash.",
  },
]

const howItWorks = [
  "Tell us about housing, ID, car, health, and anything else that causes stress.",
  "We build your Life Timeline with every deadline and action plotted for you.",
  "We warn you early and generate the email, script, or checklist so you just hit send.",
]

const pricing = [
  {
    tier: "Free",
    price: "$0",
    tagline: "Stay calm with the basics.",
    bullets: [
      "Personal timeline dashboard",
      "Email reminders 30/7/1 days out",
      "Copy-and-send action templates",
    ],
  },
  {
    tier: "Pro",
    price: "$8/mo",
    tagline: "Serious protection for grown-up life.",
    bullets: [
      "Urgent SMS safety alerts",
      "Auto-filled letters with timestamps",
      "Secure document vault & proof storage",
    ],
    highlighted: true,
  },
]

const spinningWords = ["DEADLINES", "LETTERS", "RENEWALS", "PROOF"]

export default function LandingPage() {
  return (
    <div className="space-y-24">
      <section className="relative grid gap-12 overflow-hidden rounded-[3rem] px-6 py-12 md:grid-cols-[1.15fr_1fr] md:px-16 md:py-16 vintage-panel">
        <div className="pointer-events-none absolute -left-24 top-16 hidden h-48 w-48 -rotate-6 rounded-full border border-dashed border-[#cba578]/60 bg-[#fff7ea]/60 timeline-ruler blur-sm md:block" />
        <motion.div
          className="pointer-events-none absolute -right-16 top-12 hidden h-40 w-40 rounded-full border border-[#9f694a]/40 bg-[#f6d9b1]/80 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#603a27] shadow-[0_14px_35px_rgba(93,58,34,0.18)] md:grid md:place-items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: [0, -8, 6, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="flicker">Always on duty</span>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute inset-x-10 top-10 h-24 rounded-[3rem] border border-[#caa06e]/40 bg-[#fff6e8]/40 blur-xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[#b98c62]/60 bg-[#f8e4ca]/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#603a27]">
            <span className="size-2 rounded-full bg-[#9f5f3a]" />
            Calm deadline stewardship
          </div>

          <motion.h1
            className="text-5xl font-semibold leading-tight text-[#351c12] ink-shadow md:text-6xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            Never miss an adult-life deadline again.
          </motion.h1>
          <p className="text-lg leading-relaxed text-[#6e4630]">
            We track your lease, license, insurance, visa, and health checkups — warn you before it gets expensive — and hand you
            the exact script so you just click send.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-full border border-[#9f694a]/60 bg-[#412215] px-7 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#fff5e7] shadow-[0_12px_22px_rgba(51,24,13,0.35)] hover:bg-[#5d2f1e]"
            >
              <Link href="/onboarding" className="flex items-center gap-3">
                Begin the ritual
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full border border-[#caa06e]/70 bg-[#fff7ea]/80 px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#6a3e2a] shadow-[0_10px_20px_rgba(109,67,49,0.15)] hover:bg-[#f8e4ca]"
            >
              <Link href="/dashboard">Browse the timeline</Link>
            </Button>
          </div>

          <div className="grid gap-3 text-sm text-[#5a3422] sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#d9b58b]/60 bg-[#fff3e1]/80 px-4 py-3">
              <ShieldPlus className="size-4 text-[#a46443]" />
              Your data stays private. We only track what you tell us.
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#d9b58b]/60 bg-[#fff3e1]/80 px-4 py-3">
              <CalendarCheck2 className="size-4 text-[#a46443]" />
              We remind you before it becomes urgent. You stay in control.
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-12 right-10 hidden h-40 w-40 rounded-full border border-[#cda777]/70 bg-[#fff4df]/90 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#744a33] md:flex md:flex-col md:items-center md:justify-center">
            <motion.div
              className="rotating-glyph"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            >
              <div className="flex flex-col items-center gap-1 text-center">
                {spinningWords.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="relative flex flex-col gap-4">
            <motion.div
              className="absolute -left-6 top-10 hidden -rotate-3 rounded-full border border-[#b9895c]/50 bg-[#f6d9b1]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5a3422] shadow-[0_10px_25px_rgba(95,60,39,0.2)] md:block"
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              Stamped proof ready
            </motion.div>

            <Card className="vintage-card-soft shadow-none">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-[#7a452d]">
                  <span>Sample timeline preview</span>
                  <span className="text-[#b2774d]">Week 07</span>
                </div>
                <div className="space-y-4 text-sm text-[#5b3827]">
                  <SampleCard
                    index={0}
                    title="Lease notice due in 18 days"
                    body="We’ll generate the formal move-out letter. You just click send."
                    accent="bg-[#fbe0d2] text-[#8f3d2d]"
                  />
                  <SampleCard
                    index={1}
                    title="Driver’s license expires in 42 days"
                    body="Check the DMV checklist before you go so you’re in and out."
                    accent="bg-[#f6e4bc] text-[#7a531d]"
                  />
                  <SampleCard
                    index={2}
                    title="Book a dentist cleaning"
                    body="Use the call script to schedule in under 60 seconds."
                    accent="bg-[#e6f0d8] text-[#486135]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-16 bottom-4 hidden border-t border-dashed border-[#c7a072]/70 pt-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#835539] md:flex">
          <div className="deadline-ticker">
            {spinningWords.concat(spinningWords).map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
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
                <h3 className="text-xl font-semibold text-[#3b1f16]">{point.title}</h3>
                <p className="text-sm leading-relaxed text-[#6d4630]">{point.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="relative overflow-hidden space-y-8 rounded-[3rem] border border-[#caa06e]/50 bg-[#fff7ea]/80 px-6 py-12 shadow-[0_18px_45px_rgba(93,58,34,0.18)] backdrop-blur md:px-16">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#b9895c]/40 bg-[#f6d9b1]/40 blur-2xl" />
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#805239]">
          <ClipboardList className="size-4 text-[#a46443]" />
          How it works
        </div>
        <h2 className="text-3xl font-semibold text-[#3b1f16]">
          Your personal life timeline in three steps.
        </h2>
        <ol className="grid gap-6 text-sm text-[#5f3826] md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <li
              key={item}
              className="vintage-card-soft space-y-3 border border-[#d9b58b]/70 px-6 py-6 shadow-none"
            >
              <span className="inline-flex items-center gap-3 rounded-full border border-[#cba578]/60 bg-[#f3d8b3]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a]">
                Step {index + 1}
              </span>
              <p className="leading-relaxed">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {pricing.map((plan, index) => (
          <motion.div
            key={plan.tier}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <Card
              className={`vintage-card-soft border ${
                plan.highlighted ? "border-[#b87a4c] bg-[#f6d9b1]/90" : "border-[#d9b58b]/70 bg-[#fff7ea]/80"
              }`}
            >
              <CardContent className="space-y-5 p-6">
                <div className="flex items-baseline justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#805239]">
                      {plan.tier}
                    </p>
                    <h3 className="text-3xl font-semibold text-[#3b1f16]">{plan.price}</h3>
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#9b6644]">
                    {plan.tagline}
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-[#5f3826]">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 size-2 rounded-full bg-[#a46443]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] shadow-[0_12px_24px_rgba(85,45,26,0.18)] ${
                    plan.highlighted
                      ? "border-[#8f6040]/70 bg-[#432015] text-[#fff4df] hover:bg-[#5d2f1e]"
                      : "border-[#caa06e]/70 bg-[#fff7ea]/80 text-[#6d4630] hover:bg-[#f8e4ca]"
                  }`}
                >
                  {plan.highlighted ? "Get Pro protection" : "Start for free"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <footer className="rounded-[2.5rem] border border-[#caa06e]/60 bg-[#fff3e1]/80 px-6 py-8 text-center text-sm text-[#6d4630] shadow-[0_14px_35px_rgba(95,60,39,0.18)] backdrop-blur md:px-10">
        You’re good. We’re watching the boring stuff.
      </footer>
    </div>
  )
}

interface SampleCardProps {
  title: string
  body: string
  accent: string
  index: number
}

const SampleCard = ({ title, body, accent, index }: SampleCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotate: -4 + index * 2 }}
    animate={{ opacity: 1, y: 0, rotate: -1 + index }}
    transition={{ delay: index * 0.12, duration: 0.35, ease: "easeOut" }}
    whileHover={{ rotate: 0, y: -4 }}
    className="space-y-3 rounded-3xl border border-[#d9b58b]/70 bg-[#fffaf1]/90 px-6 py-5 shadow-[0_10px_24px_rgba(93,58,34,0.16)]"
  >
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] ${accent}`}>
      {title}
    </span>
    <p className="text-sm leading-relaxed text-[#5f3826]">{body}</p>
  </motion.div>
)
