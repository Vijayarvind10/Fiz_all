"use client"

import { useMemo, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ProgressSteps } from "@/components/progress-steps"

type MedicationFrequency = "none" | "30" | "90"

interface OnboardingState {
  renting: boolean
  leaseEndDate: string
  leaseNoticeDays: "30" | "60" | "not_sure"
  landlordEmail: string
  hasDriverLicense: boolean
  driverLicenseExpiry: string
  hasPassport: boolean
  passportExpiry: string
  hasVisa: boolean
  visaExpiry: string
  ownsCar: boolean
  carInsuranceRenewal: string
  carRegistrationRenewal: string
  lastDentistVisit: string
  medicationFrequency: MedicationFrequency
  email: string
  phone: string
}

const steps = [
  "Housing",
  "IDs & documents",
  "Transport",
  "Health",
  "Alerts",
]

const initialState: OnboardingState = {
  renting: true,
  leaseEndDate: "",
  leaseNoticeDays: "30",
  landlordEmail: "",
  hasDriverLicense: true,
  driverLicenseExpiry: "",
  hasPassport: true,
  passportExpiry: "",
  hasVisa: false,
  visaExpiry: "",
  ownsCar: true,
  carInsuranceRenewal: "",
  carRegistrationRenewal: "",
  lastDentistVisit: "",
  medicationFrequency: "none",
  email: "",
  phone: "",
}

const stepMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState<OnboardingState>(initialState)
  const router = useRouter()

  const canAdvance = useMemo(() => {
    if (currentStep === steps.length - 1) {
      return form.email.trim().length > 3
    }
    return true
  }, [currentStep, form.email])

  const updateField = <Key extends keyof OnboardingState>(
    key: Key,
    value: OnboardingState[Key],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      toast.success("Timeline generated. Nothing will surprise you now.")
      router.push("/dashboard")
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur md:p-10">
      <div className="space-y-6">
        <ProgressSteps steps={steps} currentIndex={currentStep} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            {...stepMotion}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-6"
          >
            {currentStep === 0 && (
              <section className="space-y-5">
                <header>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Housing overview
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                    Let’s make sure rent never blindsides you.
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    This helps us warn you before notice deadlines or renewal
                    fees hit.
                  </p>
                </header>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm font-medium text-slate-700">
                    Do you rent a place right now?
                  </span>
                  <Switch
                    checked={form.renting}
                    onCheckedChange={(checked) => updateField("renting", checked)}
                    aria-label="Toggle renting status"
                  />
                </div>

                {form.renting ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                      Lease end date
                      <Input
                        type="date"
                        value={form.leaseEndDate}
                        onChange={(event) =>
                          updateField("leaseEndDate", event.target.value)
                        }
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                      Notice period
                      <Select
                        value={form.leaseNoticeDays}
                        onValueChange={(value) =>
                          updateField(
                            "leaseNoticeDays",
                            value as OnboardingState["leaseNoticeDays"],
                          )
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select notice period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="not_sure">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                      Landlord / property manager email (optional)
                      <Input
                        type="email"
                        inputMode="email"
                        placeholder="manager@leasingco.com"
                        value={form.landlordEmail}
                        onChange={(event) =>
                          updateField("landlordEmail", event.target.value)
                        }
                      />
                    </label>
                  </div>
                ) : (
                  <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Great. We’ll skip housing reminders for now. You can turn
                    them on anytime if you move.
                  </p>
                )}
              </section>
            )}

            {currentStep === 1 && (
              <section className="space-y-5">
                <header>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    IDs & legal
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                    Help us protect your ability to drive, travel, and work.
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    We warn you long before anything expires, so paperwork never
                    surprises you.
                  </p>
                </header>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <Checkbox
                      checked={form.hasDriverLicense}
                      onCheckedChange={(checked) =>
                        updateField("hasDriverLicense", Boolean(checked))
                      }
                    />
                    Driver’s license
                  </label>
                  {form.hasDriverLicense && (
                    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 md:w-1/2">
                      Expiration date
                      <Input
                        type="date"
                        value={form.driverLicenseExpiry}
                        onChange={(event) =>
                          updateField("driverLicenseExpiry", event.target.value)
                        }
                      />
                    </label>
                  )}

                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <Checkbox
                      checked={form.hasPassport}
                      onCheckedChange={(checked) =>
                        updateField("hasPassport", Boolean(checked))
                      }
                    />
                    Passport
                  </label>
                  {form.hasPassport && (
                    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 md:w-1/2">
                      Expiration date
                      <Input
                        type="date"
                        value={form.passportExpiry}
                        onChange={(event) =>
                          updateField("passportExpiry", event.target.value)
                        }
                      />
                    </label>
                  )}

                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <Checkbox
                      checked={form.hasVisa}
                      onCheckedChange={(checked) =>
                        updateField("hasVisa", Boolean(checked))
                      }
                    />
                    Visa / work authorization
                  </label>
                  {form.hasVisa && (
                    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 md:w-1/2">
                      Renewal deadline
                      <Input
                        type="date"
                        value={form.visaExpiry}
                        onChange={(event) =>
                          updateField("visaExpiry", event.target.value)
                        }
                      />
                    </label>
                  )}
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="space-y-5">
                <header>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Car & transport
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                    Avoid insurance lapses and registration surprises.
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    We’ll warn you ahead of renewals so you never pay late fees.
                  </p>
                </header>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm font-medium text-slate-700">
                    Do you have a car in your name?
                  </span>
                  <Switch
                    checked={form.ownsCar}
                    onCheckedChange={(checked) => updateField("ownsCar", checked)}
                    aria-label="Toggle car ownership"
                  />
                </div>

                {form.ownsCar ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                      Car insurance renews on
                      <Input
                        type="date"
                        value={form.carInsuranceRenewal}
                        onChange={(event) =>
                          updateField("carInsuranceRenewal", event.target.value)
                        }
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                      Registration / tags due
                      <Input
                        type="month"
                        value={form.carRegistrationRenewal}
                        onChange={(event) =>
                          updateField(
                            "carRegistrationRenewal",
                            event.target.value,
                          )
                        }
                      />
                    </label>
                  </div>
                ) : (
                  <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    No car, no problem. We’ll skip these reminders until you add
                    one.
                  </p>
                )}
              </section>
            )}

            {currentStep === 3 && (
              <section className="space-y-5">
                <header>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Health maintenance
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                    Health checkups and refills stay on your radar.
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    We’ll nudge you when it’s time so you use the benefits you
                    already pay for.
                  </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Last dentist visit
                    <Input
                      type="month"
                      value={form.lastDentistVisit}
                      onChange={(event) =>
                        updateField("lastDentistVisit", event.target.value)
                      }
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Medication refills
                    <Select
                      value={form.medicationFrequency}
                      onValueChange={(value) =>
                        updateField(
                          "medicationFrequency",
                          value as MedicationFrequency,
                        )
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose a cadence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          I don’t have repeating medication
                        </SelectItem>
                        <SelectItem value="30">Every 30 days</SelectItem>
                        <SelectItem value="90">Every 90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="space-y-5">
                <header>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Where to reach you
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                    Final piece: how we warn you before things get urgent.
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    We send respectful heads-up emails and (optionally) urgent
                    SMS alerts.
                  </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                    Email for timeline updates
                    <Input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                    Phone for urgent SMS (optional, Pro feature)
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                    />
                  </label>
                </div>

                <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
                  We only track what you tell us. No bank logins. No medical
                  portals. Just proactive reminders.
                </p>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col-reverse gap-3 pt-4 md:flex-row md:justify-between">
          <Button
            variant="outline"
            onClick={goBack}
            className="rounded-full text-sm"
          >
            {currentStep === 0 ? "Back to home" : "Back"}
          </Button>
          <Button
            onClick={goNext}
            disabled={!canAdvance}
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {currentStep === steps.length - 1 ? "Create my timeline" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
