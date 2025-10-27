"use client"

import { useMemo } from "react"

import { motion } from "framer-motion"
import { CalendarClock, CheckCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Obligation } from "@/types/obligation"

const criticalityStyles: Record<
  Obligation["criticality"],
  { ring: string; badge: string }
> = {
  high: {
    ring: "ring-[rgba(196,86,64,0.32)]",
    badge: "bg-[#f8cec1] text-[#8f3d2d]",
  },
  medium: {
    ring: "ring-[rgba(201,160,115,0.36)]",
    badge: "bg-[#f6e1b8] text-[#7a531d]",
  },
  low: {
    ring: "ring-[rgba(168,190,150,0.36)]",
    badge: "bg-[#e6f0d8] text-[#486135]",
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
  const arcDegrees = Math.round(completionRatio * 360)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
      className={cn(
        "relative h-full",
        obligation.completed && "opacity-55 grayscale",
      )}
    >
      <Card
        className={cn(
          "flex h-full flex-col justify-between rounded-[2.25rem] border border-[#d9b58b]/70 bg-[#fff9ef]/90 shadow-[0_16px_28px_rgba(95,60,39,0.18)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,60,39,0.22)]",
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
              <Badge className={cn("text-[11px] font-semibold uppercase tracking-[0.32em]", style.badge)}>
                {urgencyLabel}
              </Badge>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7a452d]">
                <div
                  className="relative flex size-10 items-center justify-center rounded-full border border-[#d9b58b]/70 bg-[#fff9ef]/70"
                  style={{
                    background: `conic-gradient(rgba(124, 63, 45, 0.5) ${arcDegrees}deg, rgba(255, 247, 236, 0.8) ${arcDegrees}deg)`,
                  }}
                >
                  <span className="text-[10px] font-semibold text-[#4a2a1d]">
                    {Math.max(daysLeft, 0)}d
                  </span>
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
