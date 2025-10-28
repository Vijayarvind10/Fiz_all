"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { ShieldCheck, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [emailReminders, setEmailReminders] = useState(true)
  const [smsReminders, setSmsReminders] = useState(false)

  return (
    <div className="space-y-12 text-[#331c14]">
      <header className="relative overflow-hidden rounded-[3rem] border border-[#caa06e]/60 bg-[rgba(255,247,234,0.9)] px-6 py-10 shadow-[0_24px_65px_rgba(45,21,12,0.2)] backdrop-blur md:px-14 vintage-panel">
        <div aria-hidden className="pointer-events-none absolute -left-16 top-6 size-44 rounded-full border border-[#d9b58b]/55 bg-[rgba(243,216,179,0.48)] blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-8 top-8 hidden h-24 w-24 rounded-full border border-[#caa06e]/55 bg-[rgba(164,115,83,0.3)] blur-xl md:block" />
        <span className="inline-flex items-center gap-2 rounded-full border border-[#cba578]/60 bg-[rgba(243,216,179,0.8)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a]">
          Account atelier
        </span>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f1a12] md:text-[2.85rem]">Keep your safety net tuned.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#644030]">
          Adjust reminder channels, refresh tracked dates, and explore Pro perks so the atelier can warn you before anything goes off track.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          <Card className="relative overflow-hidden rounded-[2.5rem] border border-[#d9b58b]/70 bg-[rgba(255,249,239,0.92)] shadow-[0_16px_32px_rgba(95,60,39,0.18)]">
            <CardHeader className="flex flex-col gap-1">
              <CardTitle className="text-base font-semibold text-[#2f1a12]">Notification channels</CardTitle>
              <p className="text-xs text-[#7a452d]">
                Choose how we nudge you — calm emails for everyone, urgent SMS for Pro subscribers.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-[1.75rem] border border-[#d9b58b]/70 bg-[rgba(255,243,225,0.92)] px-4 py-3 text-sm text-[#5f3826]">
                <div className="max-w-[80%] space-y-1">
                  <p className="font-semibold">Email reminders</p>
                  <p className="text-xs text-[#805239]">We email you 30, 7, and 1 day before every tracked deadline.</p>
                </div>
                <Switch checked={emailReminders} onCheckedChange={setEmailReminders} aria-label="Toggle email reminders" />
              </div>
              <div className="flex items-center justify-between rounded-[1.75rem] border border-[#b87a4c]/70 bg-[rgba(246,217,177,0.9)] px-4 py-3 text-sm text-[#5f3826]">
                <div className="max-w-[80%] space-y-1">
                  <p className="font-semibold">SMS urgent alerts</p>
                  <p className="text-xs text-[#7a452d]">Texts land 7 and 1 day before legal or financial deadlines. Pro feature.</p>
                </div>
                <Switch checked={smsReminders} onCheckedChange={setSmsReminders} aria-label="Toggle SMS reminders" disabled />
              </div>
              <Button className="rounded-full border border-[#8f6040]/70 bg-[#412215] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#fff5e7] shadow-[0_14px_28px_rgba(42,17,10,0.36)] hover:bg-[#5d2f1e]">
                Update channels
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-[2.5rem] border border-[#d9b58b]/70 bg-[rgba(255,249,239,0.92)] shadow-[0_16px_32px_rgba(95,60,39,0.18)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#2f1a12]">Update tracked dates</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <VintageField id="lease_end" label="Lease ends" placeholder="2025-12-15" type="date" />
              <VintageField id="license_expiry" label="Driver’s license expires" placeholder="2026-02-01" type="date" />
              <VintageField id="passport_expiry" label="Passport expires" placeholder="2029-08-30" type="date" />
              <VintageField id="visa_expiry" label="Visa / OPT expires" placeholder="2025-03-15" type="date" />
              <VintageField id="insurance_renewal" label="Car insurance renews" placeholder="2025-01-05" type="date" />
              <VintageField id="dentist_last" label="Last dentist visit" placeholder="2024-09" type="month" />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            <Card className="relative overflow-hidden rounded-[2.5rem] border border-[#b87a4c]/70 bg-[rgba(246,217,177,0.92)] shadow-[0_16px_32px_rgba(95,60,39,0.18)]">
              <CardHeader className="flex flex-row items-start gap-3">
                <div className="floating-stamp rounded-full border border-[#a46443]/60 bg-[rgba(255,244,223,0.9)] p-2 text-[#a46443]">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-[#2f1a12]">You’re on the Free plan</CardTitle>
                  <p className="mt-1 text-xs text-[#7a452d]">
                    Upgrade for SMS alerts, auto-filled letters dripping with timestamped proof, and your document vault.
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full rounded-full border border-[#8f6040]/70 bg-[#412215] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#fff5e7] shadow-[0_14px_28px_rgba(42,17,10,0.36)] hover:bg-[#5d2f1e]">
                  See Pro benefits
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="relative overflow-hidden rounded-[2.5rem] border border-[#d9b58b]/70 bg-[rgba(255,249,239,0.92)] shadow-[0_16px_32px_rgba(95,60,39,0.18)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#2f1a12]">
                Document vault
                <span className="rounded-full border border-[#8f6040]/70 bg-[#412215] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#fff5e7]">
                  Pro
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-[#5f3826]">
              <p>
                Store scans of IDs, leases, insurance cards, and receipts. We timestamp every upload for pristine proof when you need it.
              </p>
              <Button
                variant="outline"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#caa06e]/70 bg-[rgba(255,249,239,0.94)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6d4630] hover:bg-[rgba(248,228,202,0.95)]"
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

interface VintageFieldProps {
  id: string
  label: string
  placeholder: string
  type?: string
}

function VintageField({ id, label, placeholder, type = "text" }: VintageFieldProps) {
  return (
    <div className="space-y-2 text-sm text-[#5f3826]">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7a452d]">
        {label}
      </Label>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d9b58b]/70 bg-[rgba(255,243,225,0.92)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className="border-none bg-transparent text-[#4b2b1c] focus-visible:ring-0"
        />
      </div>
    </div>
  )
}
