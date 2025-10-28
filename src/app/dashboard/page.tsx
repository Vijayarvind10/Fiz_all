"use client"

import { useMemo, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

import { ActionModal } from "@/components/action-modal"
import { ObligationCard } from "@/components/obligation-card"
import { ProUpsellCard } from "@/components/pro-upsell-card"
import { mockObligations } from "@/lib/mock-data"
import { Obligation } from "@/types/obligation"

export default function DashboardPage() {
  const [obligations, setObligations] = useState<Obligation[]>(mockObligations)
  const [activeObligation, setActiveObligation] = useState<Obligation | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const sortedObligations = useMemo(() => {
    return [...obligations].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }, [obligations])

  const openModal = (obligation: Obligation) => {
    setActiveObligation(obligation)
    setModalOpen(true)
  }

  const toggleObligation = (id: string) => {
    setObligations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    )
  }

  return (
    <div className="space-y-12 text-[#331c14]">
      <header className="relative overflow-hidden rounded-[3rem] border border-[#caa06e]/60 bg-[rgba(255,247,234,0.9)] px-6 py-10 shadow-[0_24px_65px_rgba(45,21,12,0.2)] backdrop-blur md:px-14 vintage-panel">
        <div aria-hidden className="pointer-events-none absolute -left-16 top-0 size-48 rounded-full border border-[#d9b58b]/55 bg-[rgba(243,216,179,0.5)] blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-10 top-6 hidden h-24 w-24 rounded-full border border-[#caa06e]/55 bg-[rgba(164,115,83,0.28)] blur-xl md:block" />
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cba578]/60 bg-[rgba(243,216,179,0.8)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a]">
          Next 90 days
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-snug text-[#2f1a12] md:text-[2.9rem]">
          Nothing in your life sneaks up on you anymore.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#644030]">
          This atelier timeline watches leases, IDs, visas, insurance, and health rituals. We warn you before fees or expirations hit
          and give you the exact script or checklist so action feels intentional — not rushed.
        </p>
        <div className="mt-6 hidden overflow-hidden rounded-full border border-[#caa06e]/55 bg-[rgba(255,243,225,0.9)] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#7a452d] md:block">
          <div className="deadline-ticker deadline-ticker--scroll">
            {["Lease letters", "Visa prep", "Insurance calls", "Proof vault"].flatMap((item) => [item, item])
              .map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-5 md:grid-cols-2">
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
          className="space-y-6"
        >
          <div className="vintage-card space-y-3 border border-[#d9b58b]/70 px-5 py-5 text-sm text-[#5f3826] shadow-none">
            <div className="flex items-start gap-3">
              <span className="rounded-full border border-[#cba578]/60 bg-[rgba(246,217,177,0.85)] p-2 text-[#a46443] shadow-[0_10px_22px_rgba(90,55,34,0.18)]">
                <AlertTriangle className="size-4" />
              </span>
              <div className="space-y-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7a452d]">Heads-up cadence</h2>
                <p>
                  Ritual reminders land 30, 7, and 1 day before each obligation. Free covers email. Pro layers in SMS so you never miss a
                  legal or financial cutoff.
                </p>
              </div>
            </div>
          </div>

          <ProUpsellCard />
        </motion.aside>
      </section>

      <ActionModal open={modalOpen} obligation={activeObligation} onClose={() => setModalOpen(false)} />
    </div>
  )
}
