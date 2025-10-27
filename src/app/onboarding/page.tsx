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
    <div className="relative mx-auto w-full max-w-4xl space-y-8 overflow-hidden rounded-[3rem] border border-[#caa06e]/60 bg-[#fff7ea]/85 p-6 shadow-[0_18px_45px_rgba(93,58,34,0.2)] backdrop-blur md:p-10">
      <div className="pointer-events-none absolute -right-16 top-0 h-32 w-32 rounded-full border border-[#d9b58b]/60 bg-[#f3d8b3]/50 blur-xl" />
      <div className="pointer-events-none absolute -left-12 bottom-4 h-28 w-28 rounded-full border border-[#d9b58b]/40 bg-[#fff7ea]/40 blur-lg" />
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-[#3b1f16]">
            Tell us about the deadlines you’re juggling.
          </h1>
          <span className="hidden rounded-full border border-[#cba578]/60 bg-[#f3d8b3]/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a] md:block">
            Guided ritual
          </span>
        </div>
        <ProgressSteps steps={steps} currentIndex={currentStep} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            {...stepMotion}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-6"
          >
            {currentStep === 0 && (
              <section className="space-y-5">
                <header className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#805239]">
                    Housing overview
                  </p>
                  <h2 className="text-2xl font-semibold text-[#3b1f16]">
                    Let’s make sure rent never blindsides you.
                  </h2>
                  <p className="text-sm leading-relaxed text-[#6d4630]">
                    This helps us warn you before notice deadlines or renewal fees hit.
                  </p>
                </header>

                <div className="flex items-center justify-between rounded-[1.75rem] border border-[#d9b58b]/70 bg-[#fff3e1]/80 px-4 py-3 text-sm text-[#5f3826]">
                  <span className="font-medium">Do you rent a place right now?</span>
                  <Switch
                    checked={form.renting}
                    onCheckedChange={(checked) => updateField("renting", checked)}
                    aria-label="Toggle renting status"
                  />
                </div>

                {form.renting ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <VintageLabel label="Lease end date">
                      <Input
                        type="date"
                        value={form.leaseEndDate}
                        onChange={(event) =>
                          updateField("leaseEndDate", event.target.value)
                        }
                      />
                    </VintageLabel>

                    <VintageLabel label="Notice period">
                      <Select
                        value={form.leaseNoticeDays}
                        onValueChange={(value) =>
                          updateField(
                            "leaseNoticeDays",
                            value as OnboardingState["leaseNoticeDays"],
                          )
                        }
                      >
                        <SelectTrigger className="rounded-2xl border-[#d9b58b]/70 bg-[#fffaf1]/80">
                          <SelectValue placeholder="Select notice period" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border border-[#d9b58b]/70 bg-[#fff7ea] text-[#5f3826]">
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="not_sure">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </VintageLabel>

                    <VintageLabel
                      className="md:col-span-2"
                      label="Landlord / property manager email (optional)"
                    >
                      <Input
                        type="email"
                        inputMode="email"
                        placeholder="manager@leasingco.com"
                        value={form.landlordEmail}
                        onChange={(event) =>
                          updateField("landlordEmail", event.target.value)
                        }
                      />
                    </VintageLabel>
                  </div>
                ) : (
                  <div className="rounded-[1.75rem] border border-[#a8be96]/60 bg-[#e6f0d8]/80 px-4 py-4 text-sm text-[#486135]">
                    When housing is stable, we note the date you last moved so you still get seasonal upkeep nudges.
                  </div>
                )}
              </section>
            )}

            {currentStep === 1 && (
              <section className="space-y-5">
                <header className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#805239]">
                    IDs & travel
                  </p>
                  <h2 className="text-2xl font-semibold text-[#3b1f16]">
                    Keep your credentials current everywhere you go.
                  </h2>
                  <p className="text-sm leading-relaxed text-[#6d4630]">
                    We’ll remind you early enough to renew calmly or gather new documents without chaos.
                  </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                  <ToggleCard
                    label="Driver’s license on file?"
                    checked={form.hasDriverLicense}
                    onCheckedChange={(value) => updateField("hasDriverLicense", value)}
                  />

                  <ToggleCard
                    label="Passport available?"
                    checked={form.hasPassport}
                    onCheckedChange={(value) => updateField("hasPassport", value)}
                  />

                  {form.hasDriverLicense && (
                    <VintageLabel label="License expires">
                      <Input
                        type="date"
                        value={form.driverLicenseExpiry}
                        onChange={(event) =>
                          updateField("driverLicenseExpiry", event.target.value)
                        }
                      />
                    </VintageLabel>
                  )}

                  {form.hasPassport && (
                    <VintageLabel label="Passport expires">
                      <Input
                        type="date"
                        value={form.passportExpiry}
                        onChange={(event) =>
                          updateField("passportExpiry", event.target.value)
                        }
                      />
                    </VintageLabel>
                  )}

                  <ToggleCard
                    className="md:col-span-2"
                    label="Do you rely on a visa or work authorization?"
                    checked={form.hasVisa}
                    onCheckedChange={(value) => updateField("hasVisa", value)}
                  />

                  {form.hasVisa && (
                    <VintageLabel label="Visa / OPT expiry">
                      <Input
                        type="date"
                        value={form.visaExpiry}
                        onChange={(event) =>
                          updateField("visaExpiry", event.target.value)
                        }
                      />
                    </VintageLabel>
                  )}
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="space-y-5">
                <header className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#805239]">
                    Transport protection
                  </p>
                  <h2 className="text-2xl font-semibold text-[#3b1f16]">
                    Let’s keep the wheels (and paperwork) spinning.
                  </h2>
                  <p className="text-sm leading-relaxed text-[#6d4630]">
                    Share what you drive so we can time renewals, inspections, and insurance.
                  </p>
                </header>

                <ToggleCard
                  label="Do you own a car?"
                  checked={form.ownsCar}
                  onCheckedChange={(value) => updateField("ownsCar", value)}
                />

                {form.ownsCar && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <VintageLabel label="Insurance renews">
                      <Input
                        type="date"
                        value={form.carInsuranceRenewal}
                        onChange={(event) =>
                          updateField("carInsuranceRenewal", event.target.value)
                        }
                      />
                    </VintageLabel>
                    <VintageLabel label="Registration renews">
                      <Input
                        type="date"
                        value={form.carRegistrationRenewal}
                        onChange={(event) =>
                          updateField("carRegistrationRenewal", event.target.value)
                        }
                      />
                    </VintageLabel>
                  </div>
                )}
              </section>
            )}

            {currentStep === 3 && (
              <section className="space-y-5">
                <header className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#805239]">
                    Health cadence
                  </p>
                  <h2 className="text-2xl font-semibold text-[#3b1f16]">
                    We’ll keep your checkups gentle and on time.
                  </h2>
                  <p className="text-sm leading-relaxed text-[#6d4630]">
                    A little preventative tracking goes a long way toward staying ahead of copays and surprise bills.
                  </p>
                </header>

                <VintageLabel label="Last dentist visit">
                  <Input
                    type="month"
                    value={form.lastDentistVisit}
                    onChange={(event) =>
                      updateField("lastDentistVisit", event.target.value)
                    }
                  />
                </VintageLabel>

                <div className="space-y-3 rounded-[1.75rem] border border-[#d9b58b]/70 bg-[#fff4df]/85 px-4 py-4 text-sm text-[#5f3826]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a452d]">
                    Medication refills
                  </span>
                  <p>How often should we remind you to refill prescriptions?</p>
                  <div className="flex flex-wrap gap-3 text-[13px] font-semibold">
                    {[
                      { value: "none", label: "No reminders" },
                      { value: "30", label: "Every month" },
                      { value: "90", label: "Every quarter" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateField("medicationFrequency", option.value as MedicationFrequency)}
                        className={`rounded-full border px-4 py-2 transition ${
                          form.medicationFrequency === option.value
                            ? "border-[#8f6040]/70 bg-[#432015] text-[#fff4df]"
                            : "border-[#cba578]/60 bg-[#fffaf1]/80 text-[#6d4630] hover:bg-[#f8e4ca]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="space-y-5">
                <header className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#805239]">
                    Final touches
                  </p>
                  <h2 className="text-2xl font-semibold text-[#3b1f16]">
                    Where should we send the gentle nudges?
                  </h2>
                  <p className="text-sm leading-relaxed text-[#6d4630]">
                    Enter contact details for reminders. SMS is optional unless you upgrade to Pro.
                  </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                  <VintageLabel label="Email">
                    <Input
                      type="email"
                      inputMode="email"
                      value={form.email}
                      placeholder="you@example.com"
                      onChange={(event) => updateField("email", event.target.value)}
                    />
                  </VintageLabel>
                  <VintageLabel label="Phone (optional)">
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                    />
                  </VintageLabel>
                </div>

                <div className="flex items-center gap-3 rounded-[1.75rem] border border-[#d9b58b]/70 bg-[#fff3e1]/80 px-4 py-3 text-sm text-[#5f3826]">
                  <Checkbox id="promo" />
                  <label htmlFor="promo" className="cursor-pointer">
                    Send me curated templates and deadline cheat-sheets each season.
                  </label>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Button
          variant="outline"
          onClick={goBack}
          className="rounded-full border border-[#caa06e]/70 bg-[#fffaf1]/80 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a] hover:bg-[#f8e4ca]"
        >
          {currentStep === 0 ? "Back to home" : "Go back"}
        </Button>
        <Button
          disabled={!canAdvance}
          onClick={goNext}
          className="rounded-full border border-[#8f6040]/70 bg-[#432015] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#fff4df] shadow-[0_14px_32px_rgba(67,32,21,0.3)] hover:bg-[#5d2f1e] disabled:border-[#d9b58b]/50 disabled:bg-[#cba578]/50"
        >
          {currentStep === steps.length - 1 ? "Create my timeline" : "Next step"}
        </Button>
      </div>
    </div>
  )
}

interface VintageLabelProps {
  label: string
  children: React.ReactNode
  className?: string
}

const VintageLabel = ({ label, children, className }: VintageLabelProps) => (
  <label className={`flex flex-col gap-2 text-sm font-medium text-[#5f3826] ${className ?? ""}`}>
    {label}
    {children}
  </label>
)

interface ToggleCardProps {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

const ToggleCard = ({ label, checked, onCheckedChange, className }: ToggleCardProps) => (
  <div
    className={`flex items-center justify-between rounded-[1.75rem] border px-4 py-3 text-sm text-[#5f3826] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${
      checked
        ? "border-[#8f6040]/70 bg-[#f6d9b1]/80"
        : "border-[#d9b58b]/70 bg-[#fff4df]/70"
    } ${className ?? ""}`}
  >
    <span className="font-medium">{label}</span>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
)
