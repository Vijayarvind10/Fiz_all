"use client"

import { CSSProperties, useMemo } from "react"

import { motion } from "framer-motion"
import { CalendarClock, CheckCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Obligation } from "@/types/obligation"

const criticalityStyles: Record<
  Obligation["criticality"],
  { ring: string; badge: string }
> = {
  high: {
    ring: "border-[#d79b83]/70",
    badge: "bg-[rgba(248,206,193,0.9)] text-[#8f3d2d]",
  },
  medium: {
    ring: "border-[#d9b58b]/70",
    badge: "bg-[rgba(246,225,184,0.9)] text-[#7a531d]",
  },
  low: {
    ring: "border-[#b6c9a5]/70",
    badge: "bg-[rgba(230,240,216,0.9)] text-[#486135]",
  },
}

const calculateDaysUntil = (dueDate: string) => {
  const now = new Date()
  const due = new Date(dueDate)
  const diff = due.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const formatTargetDate = (dueDate: string) =>
  new Date(dueDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

interface ObligationCardProps {
  obligation: Obligation
  index: number
  onShowAction: (obligation: Obligation) => void
  onToggleComplete: (id: string) => void
}

export const ObligationCard = ({
  obligation,
  index,
  onShowAction,
  onToggleComplete,
}: ObligationCardProps) => {
  const daysLeft = useMemo(
    () => calculateDaysUntil(obligation.dueDate),
    [obligation.dueDate],
  )

  const urgencyLabel = useMemo(() => {
    if (daysLeft <= 0) return "Due now"
    if (daysLeft === 1) return "Due tomorrow"
    if (daysLeft < 7) return `Due in ${daysLeft} days`
    return `Due in ${daysLeft} days`
  }, [daysLeft])

  const style = criticalityStyles[obligation.criticality]
  const completionRatio = useMemo(() => {
    const clamped = Math.min(Math.max(daysLeft, 0), 90)
    return 1 - clamped / 90
  }, [daysLeft])
  const dialPercent = Math.round(completionRatio * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
      className={cn("relative h-full", obligation.completed && "opacity-55 grayscale")}
    >
      <Card
        className={cn(
          "vintage-card flex h-full flex-col justify-between border bg-[rgba(255,249,239,0.94)] shadow-[0_16px_32px_rgba(95,60,39,0.16)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(95,60,39,0.2)]",
          style.ring,
        )}
      >
        <CardContent className="flex h-full flex-col gap-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#3b1f16]">
                {obligation.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#6d4630]">
                {obligation.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-[#cba578]/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em]",
                  style.badge,
                )}
              >
                {urgencyLabel}
              </span>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7a452d]">
                <div
                  className="deadline-dial"
                  style={{ "--dial-fill": `${Math.min(Math.max(dialPercent, 0), 100)}%` } as CSSProperties}
                >
                  {Math.max(daysLeft, 0)}d
                </div>
                Watchlist
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#d9b58b]/60 bg-[#fff4df]/80 px-3 py-1 text-xs font-medium text-[#7a452d]">
            <CalendarClock className="size-4 text-[#a46443]" aria-hidden />
            Target date: {formatTargetDate(obligation.dueDate)}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => onShowAction(obligation)}
                className="w-full rounded-full border border-[#8f6040]/70 bg-[#432015] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#fff4df] shadow-[0_12px_24px_rgba(67,32,21,0.3)] hover:bg-[#5d2f1e]"
              >
                {getPrimaryActionLabel(obligation.actionType)}
              </Button>
            </motion.div>
            <p className="text-[12px] text-[#7a452d]">
              {obligation.actionPayload.helperText ??
                "We’ll walk you through this step so it takes minutes, not hours."}
            </p>
            <Button
              variant="outline"
              onClick={() => onToggleComplete(obligation.id)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d9b58b]/70 bg-[#fff7ea]/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6a3e2a] hover:bg-[#f6e1b8]"
            >
              <CheckCheck className="size-3.5" />
              {obligation.completed ? "Marked as done" : "Mark as done"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const getPrimaryActionLabel = (type: Obligation["actionType"]) => {
  switch (type) {
    case "email_template":
      return "Generate Email"
    case "call_script":
      return "Show Call Script"
    case "checklist":
      return "View Checklist"
    default:
      return "View Details"
  }
}
