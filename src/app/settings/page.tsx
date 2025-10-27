"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { ShieldCheck, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [emailReminders, setEmailReminders] = useState(true)
  const [smsReminders, setSmsReminders] = useState(false)

  return (
    <div className="space-y-10">
      <header className="relative overflow-hidden rounded-[2.75rem] border border-[#d9b58b]/70 bg-[#fff7ea]/75 px-6 py-8 shadow-[0_14px_32px_rgba(93,58,34,0.18)] md:px-10">
        <div className="pointer-events-none absolute inset-0 timeline-ruler opacity-20" />
        <div className="pointer-events-none absolute -right-14 top-4 h-32 w-32 rounded-full border border-[#caa06e]/50 bg-[#f6d9b1]/50 blur-xl" />
        <Badge className="border border-[#cba578]/60 bg-[#f3d8b3]/80 text-[#603a27]">
          Account
        </Badge>
        <h1 className="text-4xl font-semibold text-[#3b1f16] ink-shadow">
          Keep your safety net tuned.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#6d4630]">
          Update reminder channels, refresh critical dates, and unlock Pro perks like SMS alerts and your secure document vault.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="vintage-card-soft border border-[#d9b58b]/70 bg-[#fffaf1]/85 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#3b1f16]">
                Notification channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-[1.75rem] border border-[#d9b58b]/70 bg-[#fff4df]/80 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#5f3826]">Email reminders</p>
                  <p className="text-xs text-[#805239]">
                    We send calm heads-up emails 30, 7, and 1 day before every tracked deadline.
                  </p>
                </div>
                <Switch
                  checked={emailReminders}
                  onCheckedChange={setEmailReminders}
                  aria-label="Toggle email reminders"
                />
              </div>
              <div className="flex items-center justify-between rounded-[1.75rem] border border-[#b87a4c]/70 bg-[#f6d9b1]/85 px-4 py-3">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#5f3826]">
                    SMS urgent alerts
                    <Badge className="border border-[#8f6040]/70 bg-[#432015] text-[#fff4df]">Pro</Badge>
                  </p>
                  <p className="text-xs text-[#7a452d]">
                    Get a text 7 days and 1 day before legal or financial deadlines. No spam, just “hey, do this now.”
                  </p>
                </div>
                <Switch
                  checked={smsReminders}
                  onCheckedChange={setSmsReminders}
                  aria-label="Toggle SMS reminders"
                  disabled
                />
              </div>
              <Button className="rounded-full border border-[#8f6040]/70 bg-[#432015] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#fff4df] shadow-[0_12px_24px_rgba(67,32,21,0.3)] hover:bg-[#5d2f1e]">
                Update channels
              </Button>
            </CardContent>
          </Card>

          <Card className="vintage-card-soft border border-[#d9b58b]/70 bg-[#fffaf1]/85 shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#3b1f16]">
                Update tracked dates
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field id="lease_end" label="Lease ends" placeholder="2025-12-15" />
              <Field id="license_expiry" label="Driver’s license expires" placeholder="2026-02-01" />
              <Field id="passport_expiry" label="Passport expires" placeholder="2029-08-30" />
              <Field id="visa_expiry" label="Visa / OPT expires" placeholder="2025-03-15" />
              <Field id="insurance_renewal" label="Car insurance renews" placeholder="2025-01-05" />
              <Field
                id="dentist_last"
                label="Last dentist visit"
                placeholder="2024-09"
                type="month"
              />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Card className="vintage-card-soft border border-[#b87a4c]/70 bg-[#f6d9b1]/85 shadow-none">
              <CardHeader className="flex flex-row items-start gap-3">
                <div className="floating-stamp rounded-full border border-[#a46443]/60 bg-[#fff4df]/85 p-2 text-[#a46443]">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-[#3b1f16]">
                    You’re on the Free plan
                  </CardTitle>
                  <p className="mt-1 text-xs text-[#7a452d]">
                    Upgrade for SMS alerts, auto-filled letters, and a document vault that stores proof for you.
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full rounded-full border border-[#8f6040]/70 bg-[#432015] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#fff4df] shadow-[0_12px_24px_rgba(67,32,21,0.3)] hover:bg-[#5d2f1e]">
                  See Pro benefits
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="vintage-card-soft border border-[#d9b58b]/70 bg-[#fffaf1]/85 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#3b1f16]">
                Document vault <Badge className="border border-[#8f6040]/70 bg-[#432015] text-[#fff4df]">Pro</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-[#5f3826]">
              <p>
                Keep scanned IDs, leases, and insurance cards in one secure place. We’ll timestamp every upload so you have clean
                records when someone asks.
              </p>
              <Button
                variant="outline"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#caa06e]/70 bg-[#fffaf1]/80 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6d4630] hover:bg-[#f8e4ca]"
              >
                <UploadCloud className="size-4" />
                Upload a document
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

interface FieldProps {
  id: string
  label: string
  placeholder: string
  type?: string
}

const Field = ({ id, label, placeholder, type = "date" }: FieldProps) => {
  return (
    <div className="space-y-2 text-sm">
      <Label htmlFor={id} className="text-[#5f3826]">
        {label}
      </Label>
      <div className="relative overflow-hidden rounded-2xl border border-[#d9b58b]/70 bg-[#fffaf1]/80">
        <div className="pointer-events-none absolute inset-0 timeline-ruler opacity-20" />
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className="border-none bg-transparent"
        />
      </div>
    </div>
  )
}
