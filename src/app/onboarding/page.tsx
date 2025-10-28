"use client"

import { useMemo, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { ProgressSteps } from "@/components/progress-steps"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const steps = ["Housing", "IDs", "Transport", "Health", "Alerts"]

type MedicationFrequency = "none" | "30" | "90"

type OnboardingState = {
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

  const updateField = <Key extends keyof OnboardingState>(key: Key, value: OnboardingState[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      toast.success("Timeline assembled. Welcome to the atelier.")
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
    <div className="relative mx-auto w-full max-w-4xl space-y-8 overflow-hidden rounded-[3.5rem] border border-[#caa06e]/60 bg-[rgba(255,247,234,0.9)] px-6 py-10 shadow-[0_26px_65px_rgba(53,23,12,0.22)] backdrop-blur md:px-12 md:py-14 vintage-panel">
      <div aria-hidden className="pointer-events-none absolute -right-16 top-16 size-40 rounded-full border border-[#d9b58b]/55 bg-[rgba(243,216,179,0.45)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-12 size-44 rounded-full border border-[#cba578]/55 bg-[rgba(255,243,225,0.5)] blur-3xl" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[#805239]">Guided onboarding</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#2f1a12]">Let’s map the deadlines in your life.</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#5e3927]">
            Each step is a quick ritual. Answer once and we’ll watch renewals, notices, and paperwork for you.
          </p>
        </div>
        <motion.div
          className="floating-stamp vintage-stamp hidden md:inline-flex"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Timeline ritual
        </motion.div>
      </div>

      <ProgressSteps steps={steps} currentIndex={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          {...stepMotion}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-6"
        >
          {currentStep === 0 && (
            <StepSection
              badge="Housing stewardship"
              title="Safeguard your lease and notice deadlines."
              description="Notice lead times change everything. Tell us the cadence so we can prep letters before they’re due."
            >
              <ToggleRow
                label="Do you currently rent a home?"
                checked={form.renting}
                onCheckedChange={(value) => updateField("renting", value)}
              />

              {form.renting ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <VintageField label="Lease end date">
                    <Input
                      type="date"
                      value={form.leaseEndDate}
                      onChange={(event) => updateField("leaseEndDate", event.target.value)}
                    />
                  </VintageField>

                  <VintageField label="Notice period">
                    <Select
                      value={form.leaseNoticeDays}
                      onValueChange={(value) =>
                        updateField("leaseNoticeDays", value as OnboardingState["leaseNoticeDays"])
                      }
                    >
                      <SelectTrigger className="rounded-2xl border-[#d9b58b]/70 bg-[rgba(255,250,241,0.9)]">
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border border-[#d9b58b]/70 bg-[rgba(255,247,234,0.98)] text-[#5f3826]">
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="not_sure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </VintageField>

                  <VintageField className="md:col-span-2" label="Landlord / property manager email (optional)">
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder="manager@leasingco.com"
                      value={form.landlordEmail}
                      onChange={(event) => updateField("landlordEmail", event.target.value)}
                    />
                  </VintageField>
                </div>
              ) : (
                <InfoPanel>
                  No lease? We’ll keep ritual nudges gentle — move prep, seasonal upkeep, and proof reminders without the rent timer.
                </InfoPanel>
              )}
            </StepSection>
          )}

          {currentStep === 1 && (
            <StepSection
              badge="Identity & travel"
              title="Keep credentials valid wherever you go."
              description="Driver’s license, passport, and visa statuses get longer lead times so you never scramble."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <ToggleCard
                  label="Driver’s license on file"
                  description="We’ll prep renewal steps before scheduling windows close."
                  checked={form.hasDriverLicense}
                  onCheckedChange={(value) => updateField("hasDriverLicense", value)}
                />
                <ToggleCard
                  label="Passport available"
                  description="Useful for travel, visas, and major ID confirmation."
                  checked={form.hasPassport}
                  onCheckedChange={(value) => updateField("hasPassport", value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {form.hasDriverLicense && (
                  <VintageField label="Driver’s license expiry">
                    <Input
                      type="date"
                      value={form.driverLicenseExpiry}
                      onChange={(event) => updateField("driverLicenseExpiry", event.target.value)}
                    />
                  </VintageField>
                )}

                {form.hasPassport && (
                  <VintageField label="Passport expiry">
                    <Input
                      type="date"
                      value={form.passportExpiry}
                      onChange={(event) => updateField("passportExpiry", event.target.value)}
                    />
                  </VintageField>
                )}
              </div>

              <ToggleCard
                label="On a visa / work authorization"
                description="We’ll prep OPT, EAD, or visa renewal checklists a month before filings."
                checked={form.hasVisa}
                onCheckedChange={(value) => updateField("hasVisa", value)}
              />

              {form.hasVisa && (
                <VintageField label="Visa / work authorization expiry">
                  <Input
                    type="date"
                    value={form.visaExpiry}
                    onChange={(event) => updateField("visaExpiry", event.target.value)}
                  />
                </VintageField>
              )}
            </StepSection>
          )}

          {currentStep === 2 && (
            <StepSection
              badge="Transport"
              title="Keep the DMV and insurer calm."
              description="We watch when to call for new rates, renew tags, and prove insurance."
            >
              <ToggleRow
                label="Do you currently own a car?"
                checked={form.ownsCar}
                onCheckedChange={(value) => updateField("ownsCar", value)}
              />

              {form.ownsCar ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <VintageField label="Car insurance renews">
                    <Input
                      type="date"
                      value={form.carInsuranceRenewal}
                      onChange={(event) => updateField("carInsuranceRenewal", event.target.value)}
                    />
                  </VintageField>
                  <VintageField label="Registration / tags due">
                    <Input
                      type="month"
                      value={form.carRegistrationRenewal}
                      onChange={(event) => updateField("carRegistrationRenewal", event.target.value)}
                    />
                  </VintageField>
                </div>
              ) : (
                <InfoPanel>We’ll stay quiet about car reminders. You can add one later if wheels enter the picture.</InfoPanel>
              )}
            </StepSection>
          )}

          {currentStep === 3 && (
            <StepSection
              badge="Health & refills"
              title="Stay ahead of preventative care."
              description="Dentist cadence, physicals, and medication refills are good reasons to ping you kindly."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <VintageField label="Last dentist visit">
                  <Input
                    type="month"
                    value={form.lastDentistVisit}
                    onChange={(event) => updateField("lastDentistVisit", event.target.value)}
                  />
                </VintageField>

                <VintageField label="Medication refills">
                  <Select
                    value={form.medicationFrequency}
                    onValueChange={(value) => updateField("medicationFrequency", value as MedicationFrequency)}
                  >
                    <SelectTrigger className="rounded-2xl border-[#d9b58b]/70 bg-[rgba(255,250,241,0.9)]">
                      <SelectValue placeholder="Choose cadence" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border border-[#d9b58b]/70 bg-[rgba(255,247,234,0.98)] text-[#5f3826]">
                      <SelectItem value="none">No repeating medication</SelectItem>
                      <SelectItem value="30">Every 30 days</SelectItem>
                      <SelectItem value="90">Every 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </VintageField>
              </div>
            </StepSection>
          )}

          {currentStep === 4 && (
            <StepSection
              badge="Delivery"
              title="Where should we send the early warnings?"
              description="We only contact you for important deadlines. Email is required; SMS is optional and part of Pro."
            >
              <div className="grid gap-4">
                <VintageField label="Email">
                  <Input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                  />
                </VintageField>

                <VintageField label="Phone (for urgent SMS, optional)">
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                  />
                </VintageField>

                <div className="rounded-3xl border border-[#cba578]/60 bg-[rgba(255,243,225,0.9)] px-4 py-4 text-xs text-[#5f3826]">
                  <p className="font-semibold uppercase tracking-[0.28em] text-[#7a452d]">Promise</p>
                  <p className="mt-2 leading-relaxed">
                    We only store the dates you give us. No bank logins. No medical portals. Just calm, respectful reminders.
                  </p>
                </div>
              </div>
            </StepSection>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-3 pt-4 md:flex-row md:justify-between">
        <Button
          variant="outline"
          onClick={goBack}
          className="rounded-full border border-[#caa06e]/70 bg-[rgba(255,247,234,0.9)] px-6 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#6a3e2a] shadow-[0_12px_24px_rgba(58,29,15,0.12)] hover:bg-[rgba(248,228,202,0.95)]"
        >
          {currentStep === 0 ? "Back to atelier" : "Previous step"}
        </Button>
        <Button
          onClick={goNext}
          disabled={!canAdvance}
          className="rounded-full border border-[#9f694a]/60 bg-[#412215] px-8 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#fff5e7] shadow-[0_18px_32px_rgba(45,20,12,0.32)] hover:bg-[#5d2f1e] disabled:cursor-not-allowed disabled:border-[#d7b795]/50 disabled:bg-[rgba(97,59,41,0.4)] disabled:text-[rgba(255,244,229,0.7)]"
        >
          {currentStep === steps.length - 1 ? "Create my timeline" : "Next"}
        </Button>
      </div>
    </div>
  )
}

function StepSection({
  badge,
  title,
  description,
  children,
}: {
  badge: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#cba578]/60 bg-[rgba(243,216,179,0.8)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6a3e2a]">
          {badge}
        </span>
        <h2 className="text-2xl font-semibold text-[#2f1a12]">{title}</h2>
        <p className="text-sm leading-relaxed text-[#644030]">{description}</p>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function VintageField({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn("space-y-2 rounded-[1.75rem] border border-[#d9b58b]/70 bg-[rgba(255,249,239,0.92)] px-4 py-4 text-sm text-[#5f3826]", className)}>
      <span className="block text-xs font-semibold uppercase tracking-[0.26em] text-[#7a452d]">{label}</span>
      <div className="rounded-[1.25rem] border border-[#e6caa3]/60 bg-white/80 px-3 py-2 shadow-inner">
        {children}
      </div>
    </label>
  )
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-[1.75rem] border border-[#d9b58b]/70 bg-[rgba(255,243,225,0.9)] px-4 py-3 text-sm text-[#5f3826]">
      <span className="font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
    </div>
  )
}

function ToggleCard({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string
  description: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}) {
  return (
    <label className="flex h-full flex-col gap-3 rounded-[1.75rem] border border-[#d9b58b]/70 bg-[rgba(255,243,225,0.92)] px-4 py-4 text-sm text-[#5f3826]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7a452d]">{label}</span>
          <p className="mt-2 text-sm leading-relaxed">{description}</p>
        </div>
        <Checkbox className="mt-1 rounded-md border-[#b9895c]/70" checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </label>
  )
}

function InfoPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.75rem] border border-[#a8be96]/60 bg-[rgba(230,240,216,0.9)] px-4 py-4 text-sm text-[#3d5631]">
      {children}
    </div>
  )
}
