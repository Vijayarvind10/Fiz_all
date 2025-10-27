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
    <div className="space-y-8">
      <header className="space-y-3 text-slate-900">
        <Badge className="bg-indigo-100 text-indigo-700">Next 90 days</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Nothing in your life sneaks up on you anymore.
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          This timeline keeps lease notices, renewals, identification, and
          health checkups under control. We warn you before it gets expensive
          and give you the exact script so taking action is easy.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[2fr_1fr]">
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
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 flex-none text-amber-500" />
              <div>
                <h2 className="text-sm font-semibold text-amber-700">
                  Heads-up cadence
                </h2>
                <p>
                  We send early heads-ups 30, 7, and 1 day before each deadline.
                  Free plan uses email. Pro adds SMS alerts so you never miss a
                  legal or financial cutoff.
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
