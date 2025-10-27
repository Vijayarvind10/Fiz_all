import { Obligation } from "@/types/obligation"

export const mockObligations: Obligation[] = [
  {
    id: "lease-notice",
    title: "Give lease move-out notice",
    description:
      "Notify your landlord 30 days before the lease ends so you are not charged an extra month of rent.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 18)).toISOString(),
    criticality: "high",
    actionType: "email_template",
    actionPayload: {
      emailSubject: "Notice of Intent to Vacate – 123 Market St Apt 4B",
      emailBody:
        "Hello [Landlord Name],\n\nThis email is formal notice that I will be ending my tenancy at 123 Market St Apt 4B on [Lease End Date]. This notice is being provided [Notice Days] days before my planned move-out date, per the lease terms.\n\nPlease confirm the move-out inspection process and the procedure for returning my security deposit.\n\nThank you,\n[Your Name]\n[Your Phone Number]",
      helperText:
        "We’ll generate the exact email language for you. You just send it.",
    },
  },
  {
    id: "license-renewal",
    title: "Renew driver’s license",
    description:
      "Driving with an expired license can lead to fines and trouble with insurance claims. Renew it before it slips.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 42)).toISOString(),
    criticality: "medium",
    actionType: "checklist",
    actionPayload: {
      checklistItems: [
        "Current driver’s license",
        "Proof of residency (utility bill or lease)",
        "Payment method for renewal fee",
        "Optional: vision exam paperwork if required in your state",
      ],
      helperText:
        "We’ll remind you what paperwork to bring so the DMV visit is painless.",
    },
  },
  {
    id: "car-insurance",
    title: "Check car insurance before auto-renew",
    description:
      "Auto-renewal locks in your current rate. Calling to request a re-rate can save $20–$60/month.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 9)).toISOString(),
    criticality: "high",
    actionType: "call_script",
    actionPayload: {
      callScriptLines: [
        "Hi, I see my policy is renewing next week.",
        "I’ve been driving fewer miles and I’m checking rates.",
        "Can you re-rate my policy or apply loyalty savings before it renews?",
      ],
      helperText: "Read this script verbatim. It keeps the call short and polite.",
    },
  },
  {
    id: "dentist-booking",
    title: "Book dentist cleaning",
    description:
      "Most plans cover two cleanings per year. Scheduling now keeps you on track and prevents surprise bills.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 27)).toISOString(),
    criticality: "low",
    actionType: "call_script",
    actionPayload: {
      callScriptLines: [
        "Hi, I’d like to schedule a preventative cleaning.",
        "Do you have any availability in the next two weeks, afternoons preferred?",
        "Can you confirm what’s covered under my plan for cleanings?",
      ],
      helperText: "We give you the exact words so booking the appointment takes seconds.",
    },
  },
  {
    id: "visa-renewal",
    title: "Prep work authorization renewal",
    description:
      "Collect the standard paperwork now so your renewal can be filed without scrambling a week before the deadline.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 63)).toISOString(),
    criticality: "high",
    actionType: "checklist",
    actionPayload: {
      checklistItems: [
        "Recent pay stubs or employment verification letter",
        "Copy of current visa / work authorization",
        "Any updated passport photos required",
        "Mailing address and contact information for filings",
      ],
      infoBlocks: [
        "This is not legal advice. It’s a prep list so your paperwork is organized before you meet with an attorney or file.",
      ],
      helperText:
        "We’ll nudge you 30, 7, and 1 day before so immigration paperwork never sneaks up.",
    },
  },
]
