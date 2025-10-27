"use client"

import { useMemo, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

import { ActionModal } from "@/components/action-modal"
import { ObligationCard } from "@/components/obligation-card"
import { ProUpsellCard } from "@/components/pro-upsell-card"
import { Badge } from "@/components/ui/badge"
import { mockObligations } from "@/lib/mock-data"
import { Obligation } from "@/types/obligation"

export default function DashboardPage() {
  const [obligations, setObligations] = useState<Obligation[]>(mockObligations)
  const [activeObligation, setActiveObligation] = useState<Obligation | null>(
    null,
  )
  const [modalOpen, setModalOpen] = useState(false)

  const sortedObligations = useMemo(() => {
    return [...obligations].sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
  }, [obligations])

  const openModal = (obligation: Obligation) => {
    setActiveObligation(obligation)
    setModalOpen(true)
  }

  const toggleObligation = (id: string) => {
    setObligations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    )
  }

  return (
    <div className="space-y-10">
      <header className="relative overflow-hidden rounded-[2.75rem] border border-[#d9b58b]/70 bg-[#fff7ea]/70 px-6 py-8 text-[#3b1f16] shadow-[0_14px_32px_rgba(93,58,34,0.18)] md:px-10">
        <div className="pointer-events-none absolute -left-10 top-0 h-full w-24 timeline-ruler opacity-40" />
        <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-24 rounded-full border border-[#caa06e]/50 bg-[#f6d9b1]/40 blur-xl md:block" />
        <Badge className="border border-[#cba578]/60 bg-[#f3d8b3]/80 text-[#603a27]">
          Next 90 days
        </Badge>
        <h1 className="text-4xl font-semibold leading-snug ink-shadow">
          Nothing in your life sneaks up on you anymore.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#6d4630]">
          This timeline keeps lease notices, renewals, identification, and health checkups under control. We warn you before it
          gets expensive and hand you the exact script so taking action feels ceremonial instead of frantic.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {sortedObligations.map((obligation, index) => (
              <ObligationCard
                key={obligation.id}
                obligation={obligation}
                index={index}
                onShowAction={openModal}
                onToggleComplete={toggleObligation}
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
          className="space-y-5"
        >
          <div className="vintage-card-soft space-y-3 border border-[#d9b58b]/70 px-5 py-5 text-sm text-[#5f3826] shadow-none">
            <div className="flex items-start gap-3">
              <span className="rounded-full border border-[#cba578]/60 bg-[#f6d9b1]/80 p-2 text-[#a46443]">
                <AlertTriangle className="size-4" />
              </span>
              <div className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7a452d]">
                  Heads-up cadence
                </h2>
                <p>
                  We send early whispers 30, 7, and 1 day before each deadline. Free plan uses email. Pro adds SMS alerts so you
                  never miss a legal or financial cutoff.
                </p>
              </div>
            </div>
          </div>

          <ProUpsellCard />
        </motion.aside>
      </section>

      <ActionModal
        open={modalOpen}
        obligation={activeObligation}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}
