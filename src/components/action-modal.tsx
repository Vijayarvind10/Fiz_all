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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-sm px-4 py-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                  Next step
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  {obligation.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {obligation.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-500 hover:text-slate-900"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm text-slate-700">
              {obligation.actionType === "email_template" && (
                <section className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email subject
                    </p>
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                      {obligation.actionPayload.emailSubject}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email body
                    </p>
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 leading-relaxed">
                      {obligation.actionPayload.emailBody}
                    </div>
                  </div>
                  <Button
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800"
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
                  <header className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Phone className="size-4 text-indigo-500" />
                    60-second call script
                  </header>
                  <ol className="space-y-2">
                    {obligation.actionPayload.callScriptLines?.map(
                      (line, idx) => (
                        <li
                          key={idx}
                          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
                        >
                          {line}
                        </li>
                      ),
                    )}
                  </ol>
                  <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
                    Say the line, then pause. Let the rep make the next move.
                  </p>
                </section>
              )}

              {obligation.actionType === "checklist" && (
                <section className="space-y-3">
                  <header className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <ListChecks className="size-4 text-indigo-500" />
                    Bring this with you
                  </header>
                  <ul className="list-inside list-disc space-y-2 text-slate-700">
                    {obligation.actionPayload.checklistItems?.map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      ),
                    )}
                  </ul>
                  {obligation.actionPayload.infoBlocks?.map((block, idx) => (
                    <p
                      key={idx}
                      className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-xs text-indigo-700"
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
                    className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-xs text-indigo-700"
                  >
                    {block}
                  </p>
                ))}
            </div>

            <footer className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <CalendarCheck className="size-4 text-indigo-500" />
                Pro can email this for you and store timestamped proof.
              </div>
              <Button
                variant="outline"
                className="rounded-full text-xs"
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
