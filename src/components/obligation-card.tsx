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
    ring: "ring-red-200",
    badge: "bg-red-100 text-red-700",
  },
  medium: {
    ring: "ring-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  low: {
    ring: "ring-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
      className={cn(
        "relative h-full",
        obligation.completed && "opacity-60 grayscale",
      )}
    >
      <Card
        className={cn(
          "flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md",
          style.ring,
        )}
      >
        <CardContent className="flex h-full flex-col gap-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {obligation.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {obligation.description}
              </p>
            </div>
            <Badge className={cn("text-[11px] font-semibold", style.badge)}>
              {urgencyLabel}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CalendarClock className="size-4 text-slate-400" aria-hidden />
            Target date: {formatTargetDate(obligation.dueDate)}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => onShowAction(obligation)}
                className="w-full rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                {getPrimaryActionLabel(obligation.actionType)}
              </Button>
            </motion.div>
            <p className="text-[12px] text-slate-500">
              {obligation.actionPayload.helperText ??
                "We’ll walk you through this step so it takes minutes, not hours."}
            </p>
            <Button
              variant="outline"
              onClick={() => onToggleComplete(obligation.id)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl text-xs"
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
