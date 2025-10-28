import { ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const ProUpsellCard = () => {
  return (
    <Card className="relative overflow-hidden rounded-[2.25rem] border border-[#b87a4c]/70 bg-[rgba(246,217,177,0.92)] shadow-[0_16px_38px_rgba(95,60,39,0.18)]">
      <div className="pointer-events-none absolute -right-10 top-6 h-32 w-32 rounded-full border border-[#caa06e]/50 bg-[rgba(255,247,234,0.6)] blur-2xl" />
      <CardContent className="relative flex flex-col gap-5 p-6">
        <div aria-hidden className="striped-overlay pointer-events-none absolute inset-0 opacity-25" />
        <div className="flex items-start gap-4">
          <div className="floating-stamp rounded-full border border-[#a46443]/60 bg-[#fff4df]/80 p-2.5 text-[#a46443] shadow-[0_10px_20px_rgba(95,60,39,0.18)]">
            <ShieldAlert className="size-5" />
          </div>
          <div className="space-y-2 text-[#5f3826]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a452d]">
              Pro safety net
            </p>
            <h3 className="text-lg font-semibold text-[#3b1f16]">
              Emergency SMS alerts before legal or financial deadlines
            </h3>
            <p className="text-sm leading-relaxed">
              We text you 7 days and 1 day before things like license expiry, lease notice cutoffs, visa renewals, and insurance
              lapses so you never miss something expensive.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 rounded-[1.75rem] border border-[#cba578]/60 bg-[#fff5e7]/85 px-5 py-4 text-xs text-[#6d4630] md:flex-row md:items-center">
          <span>
            Pro also stores timestamped proof for letters you send, plus a secure document vault for IDs and leases.
          </span>
          <Button className="rounded-full border border-[#8f6040]/70 bg-[#432015] px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#fff4df] shadow-[0_12px_24px_rgba(67,32,21,0.3)] hover:bg-[#5d2f1e]">
            Enable SMS alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
