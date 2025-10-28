"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  CalendarCheck,
  ClipboardCopy,
  Phone,
  X,
  ListChecks,
} from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Obligation } from "@/types/obligation"

interface ActionModalProps {
  open: boolean
  obligation: Obligation | null
  onClose: () => void
}

export const ActionModal = ({ open, obligation, onClose }: ActionModalProps) => {
  const handleCopy = useCallback((text: string) => {
    void navigator.clipboard.writeText(text)
    toast.success("Copied. Send it when you’re ready.")
  }, [])

  return (
    <AnimatePresence>
      {open && obligation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,18,11,0.55)] backdrop-blur-md px-4 py-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[2.75rem] border border-[#cba578]/70 bg-[rgba(255,247,234,0.95)] shadow-[0_44px_100px_rgba(32,14,9,0.45)]"
          >
            <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border border-[#d9b58b]/60 bg-[rgba(255,243,225,0.6)] blur-2xl" />
            <div aria-hidden className="striped-overlay pointer-events-none absolute inset-0 opacity-15" />
            <div className="flex items-start justify-between border-b border-[#d9b58b]/70 bg-[rgba(246,217,177,0.55)] px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#7a452d]">
                  Next step
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#3b1f16]">
                  {obligation.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6d4630]">
                  {obligation.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-transparent text-[#7a452d] hover:border-[#cba578]/60 hover:bg-[#fff5e7] hover:text-[#3b1f16]"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm text-[#5f3826]">
              {obligation.actionType === "email_template" && (
                <section className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#805239]">
                      Email subject
                    </p>
                    <div className="mt-2 rounded-[1.5rem] border border-[#d9b58b]/70 bg-[#fff4df]/80 px-4 py-3 text-[#5f3826] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                      {obligation.actionPayload.emailSubject}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#805239]">
                      Email body
                    </p>
                    <div className="mt-2 rounded-[1.5rem] border border-[#d9b58b]/70 bg-[#fffaf1]/90 px-4 py-3 text-[#5f3826] leading-relaxed shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                      {obligation.actionPayload.emailBody}
                    </div>
                  </div>
                  <Button
                    className="flex w-full items-center justify-center gap-3 rounded-full border border-[#8f6040]/70 bg-[#432015] px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#fff4df] shadow-[0_12px_24px_rgba(67,32,21,0.3)] hover:bg-[#5d2f1e]"
                    onClick={() =>
                      handleCopy(
                        `${obligation.actionPayload.emailSubject ?? ""}\n\n${
                          obligation.actionPayload.emailBody ?? ""
                        }`,
                      )
                    }
                  >
                    <ClipboardCopy className="size-4" />
                    Copy email text
                  </Button>
                </section>
              )}

              {obligation.actionType === "call_script" && (
                <section className="space-y-3">
                  <header className="flex items-center gap-2 text-sm font-semibold text-[#3b1f16]">
                    <Phone className="size-4 text-[#a46443]" />
                    60-second call script
                  </header>
                  <ol className="space-y-2">
                    {obligation.actionPayload.callScriptLines?.map(
                      (line, idx) => (
                        <li
                          key={idx}
                          className="rounded-[1.5rem] border border-[#d9b58b]/70 bg-[#fff4df]/85 px-4 py-3 text-[#5f3826] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                        >
                          {line}
                        </li>
                      ),
                    )}
                  </ol>
                  <p className="rounded-[1.5rem] border border-[#a8be96]/60 bg-[#e6f0d8]/80 px-4 py-3 text-xs text-[#486135]">
                    Say the line, then pause. Let the rep make the next move.
                  </p>
                </section>
              )}

              {obligation.actionType === "checklist" && (
                <section className="space-y-3">
                  <header className="flex items-center gap-2 text-sm font-semibold text-[#3b1f16]">
                    <ListChecks className="size-4 text-[#a46443]" />
                    Bring this with you
                  </header>
                  <ul className="list-inside list-disc space-y-2 text-[#5f3826]">
                    {obligation.actionPayload.checklistItems?.map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      ),
                    )}
                  </ul>
                  {obligation.actionPayload.infoBlocks?.map((block, idx) => (
                    <p
                      key={idx}
                      className="rounded-[1.5rem] border border-[#cba578]/60 bg-[#fff4df]/85 px-4 py-3 text-xs text-[#7a452d]"
                    >
                      {block}
                    </p>
                  ))}
                </section>
              )}

              {obligation.actionPayload.infoBlocks &&
                obligation.actionType !== "checklist" &&
                obligation.actionPayload.infoBlocks.map((block, idx) => (
                  <p
                    key={idx}
                    className="rounded-[1.5rem] border border-[#cba578]/60 bg-[#fff4df]/85 px-4 py-3 text-xs text-[#7a452d]"
                  >
                    {block}
                  </p>
                ))}
            </div>

            <footer className="flex flex-col gap-3 border-t border-[#d9b58b]/70 bg-[#fff3e1]/80 px-6 py-5 text-xs text-[#6d4630] md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 text-[#7a452d]">
                <CalendarCheck className="size-4 text-[#a46443]" />
                Pro can email this for you and store timestamped proof.
              </div>
              <Button
                variant="outline"
                className="rounded-full border border-[#cba578]/60 bg-[#fff7ea]/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6a3e2a] hover:bg-[#f6e1b8]"
                onClick={onClose}
              >
                Close
              </Button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
