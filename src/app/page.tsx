import { ArrowRight, CalendarCheck2, ClipboardList, ShieldPlus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export default function LandingPage() {
  return (
    <div className="space-y-20">
      <section className="grid gap-10 rounded-[2.5rem] border border-white/70 bg-white/90 px-6 py-12 shadow-sm backdrop-blur md:grid-cols-2 md:px-12 md:py-16">
        <div className="space-y-6">
          <Badge className="bg-indigo-100 text-indigo-700">Calm control</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Never miss an adult-life deadline again.
          </h1>
          <p className="text-lg text-slate-600">
            We track your lease, license, insurance, visa, and health checkups —
            warn you before it gets expensive — and hand you the exact script so
            you just click send.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white hover:bg-slate-800">
              <Link href="/onboarding" className="flex items-center gap-2">
                Get my timeline
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full border-slate-200 px-6 py-3 text-base"
            >
              <Link href="/dashboard">View the dashboard</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldPlus className="size-4 text-indigo-500" />
              Your data stays private. We only track what you tell us.
            </div>
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="size-4 text-indigo-500" />
              We remind you before it becomes urgent. You stay in control.
            </div>
          </div>
        </div>
        <div className="relative grid gap-4">
          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="rounded-2xl bg-slate-50 p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sample timeline preview
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <SampleCard
                  title="Lease notice due in 18 days"
                  body="We’ll generate the formal move-out letter. You just click send."
                  accent="bg-red-100 text-red-700"
                />
                <SampleCard
                  title="Driver’s license expires in 42 days"
                  body="Check the DMV checklist before you go so you’re in and out."
                  accent="bg-amber-100 text-amber-700"
                />
                <SampleCard
                  title="Book a dentist cleaning"
                  body="Use the call script to schedule in under 60 seconds."
                  accent="bg-emerald-100 text-emerald-700"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {proofPoints.map((point) => (
          <Card
            key={point.title}
            className="rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="space-y-3 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                {point.title}
              </h3>
              <p className="text-sm text-slate-600">{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-6 rounded-[2.5rem] border border-slate-200 bg-white/90 px-6 py-10 shadow-sm backdrop-blur md:px-12">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <ClipboardList className="size-4 text-indigo-500" />
          How it works
        </div>
        <h2 className="text-3xl font-semibold text-slate-900">
          Your personal life timeline in three steps.
        </h2>
        <ol className="space-y-5 text-sm text-slate-600 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          {howItWorks.map((item, index) => (
            <li
              key={item}
              className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                Step {index + 1}
              </span>
              <p className="mt-3 leading-relaxed">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {pricing.map((plan) => (
          <Card
            key={plan.tier}
            className={`rounded-3xl border ${
              plan.highlighted
                ? "border-indigo-200 bg-indigo-50 shadow-md"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <CardContent className="space-y-4 p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {plan.tier}
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {plan.price}
                  </h3>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {plan.tagline}
                </span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                {plan.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-indigo-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full ${
                  plan.highlighted
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {plan.highlighted ? "Get Pro protection" : "Start for free"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <footer className="rounded-3xl border border-slate-200 bg-white/90 px-6 py-8 text-center text-sm text-slate-500 shadow-sm backdrop-blur md:px-12">
        You’re good. We’re watching the boring stuff.
      </footer>
    </div>
  )
}

interface SampleCardProps {
  title: string
  body: string
  accent: string
}

const SampleCard = ({ title, body, accent }: SampleCardProps) => (
  <div className="space-y-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>
      {title}
    </span>
    <p className="text-sm text-slate-600">{body}</p>
  </div>
)
