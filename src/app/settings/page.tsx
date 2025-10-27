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
    <div className="space-y-8">
      <header className="space-y-3">
        <Badge className="bg-slate-900 text-white">Account</Badge>
        <h1 className="text-3xl font-semibold text-slate-900">
          Keep your safety net tuned.
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Update reminder channels, refresh critical dates, and unlock Pro perks
          like SMS alerts and your secure document vault.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                Notification channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Email reminders
                  </p>
                  <p className="text-xs text-slate-500">
                    We send calm heads-up emails 30, 7, and 1 day before every
                    tracked deadline.
                  </p>
                </div>
                <Switch
                  checked={emailReminders}
                  onCheckedChange={setEmailReminders}
                  aria-label="Toggle email reminders"
                />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    SMS urgent alerts
                    <Badge className="bg-indigo-600 text-white">Pro</Badge>
                  </p>
                  <p className="text-xs text-indigo-700">
                    Get a text 7 days and 1 day before legal or financial
                    deadlines. No spam, just “hey, do this now.”
                  </p>
                </div>
                <Switch
                  checked={smsReminders}
                  onCheckedChange={setSmsReminders}
                  aria-label="Toggle SMS reminders"
                  disabled
                />
              </div>
              <Button className="rounded-full bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800">
                Update channels
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">
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
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Card className="rounded-3xl border border-indigo-200 bg-indigo-50 shadow-sm">
              <CardHeader className="flex flex-row items-start gap-3">
                <div className="rounded-2xl bg-white p-2 text-indigo-600">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-slate-900">
                    You’re on the Free plan
                  </CardTitle>
                  <p className="mt-1 text-xs text-indigo-700">
                    Upgrade for SMS alerts, auto-filled letters, and a document
                    vault that stores proof for you.
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full rounded-full bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500">
                  See Pro benefits
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                Document vault <Badge className="bg-indigo-600 text-white">Pro</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <p>
                Keep scanned IDs, leases, and insurance cards in one secure
                place. We’ll timestamp every upload so you have clean records
                when someone asks.
              </p>
              <Button
                variant="outline"
                className="flex w-full items-center justify-center gap-2 rounded-full text-sm"
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
      <Label htmlFor={id} className="text-slate-700">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="rounded-xl"
      />
    </div>
  )
}
