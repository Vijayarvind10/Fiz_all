import { ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const ProUpsellCard = () => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm ring-2 ring-slate-200">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-indigo-100 p-2 text-indigo-600">
            <ShieldAlert className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pro safety net
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">
              Emergency SMS alerts before legal or financial deadlines
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              We text you 7 days and 1 day before things like license expiry,
              lease notice cutoffs, visa renewals, and insurance lapses so you
              never miss something expensive.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-xs text-indigo-700 md:flex-row md:items-center">
          <span>
            Pro also stores timestamped proof for letters you send, plus a
            secure document vault for IDs and leases.
          </span>
          <Button className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500">
            Enable SMS alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
