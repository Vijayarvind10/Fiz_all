# Life Admin Control Center

> “Never miss rent notices, renewals, insurance deadlines, doctor checkups, or documents again.”

Life Admin Control Center is a premium Next.js frontend that keeps track of stressful adult-life responsibilities and gives users the exact action to take before anything becomes expensive. The build includes a marketing site, onboarding wizard, timeline dashboard, action modal, and settings page with Pro upsells.

## ✨ Highlights

- **Vintage hero experience** wrapped in aurora grids, vignette textures, and rotating headline letterforms that instantly set a nostalgic tone.
- **Multi-step onboarding** that collects housing, ID, car, health, and contact details in under two minutes.
- **Dashboard timeline** with urgency badges, animated deadline halos, and tasteful framer-motion sequences.
- **Action modal** that generates landlord letters, call scripts, and renewal checklists (with Pro upsell copy).
- **Settings panel** for reminder channels, tracked date updates, and document vault teaser.
- **Shared component library** built on shadcn/ui, Tailwind CSS, lucide-react, and framer-motion micro-interactions.

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript, Server Components)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) for buttons, cards, dialogs, inputs, switches, and progress indicators
- [lucide-react](https://lucide.dev/) icons
- [framer-motion](https://www.framer.com/motion/) for card entrance, modal transitions, and hover micro-lifts
- [Sonner](https://sonner.emilkowal.ski/) toasts (wired to copy-to-clipboard actions)

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Vijayarvind10/Fiz_all.git
cd Fiz_all/life-admin-control-center
npm install
```

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to explore the landing page, onboarding flow, dashboard, and settings.

### Available Scripts

- `npm run dev` – start the local development server
- `npm run lint` – lint the project with ESLint
- `npm run build` – create a production build (all routes statically generated)

## 📁 Project Structure

```
life-admin-control-center/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Marketing landing page
│   │   ├── onboarding/page.tsx   # Multi-step onboarding wizard
│   │   ├── dashboard/page.tsx    # Timeline dashboard with mock data
│   │   └── settings/page.tsx     # Reminder settings & Pro upsell
│   ├── components/
│   │   ├── header-nav.tsx
│   │   ├── obligation-card.tsx
│   │   ├── action-modal.tsx
│   │   ├── pro-upsell-card.tsx
│   │   └── ui/* (shadcn components)
│   ├── lib/mock-data.ts          # Seed obligations used on the dashboard
│   └── types/obligation.ts
└── docs/                         # GitHub Pages microsite (index.md, about.md, etc.)
```

## 🧪 Mock Data & Behavior

The dashboard consumes mocked obligations defined in `src/lib/mock-data.ts`. Each obligation includes criticality, due date, action type (`email_template`, `call_script`, `checklist`), and helper text. This mirrors the eventual backend shape described in the product spec (User → Obligation → ReminderSchedule).

Action cards:

- Compute “due in X days” messaging with urgency colors.
- Trigger the `ActionModal` with email templates, call scripts, or checklists.
- Support `Mark as done` state toggling for future integration with the persistence layer.

## 🌐 GitHub Pages Setup

The repository bundles a lightweight Jekyll site in `/docs` so you can host marketing documentation on GitHub Pages while iterating on the Next.js app locally.

1. Run `npm run deploy` to output a static build into `/docs` with the correct GitHub Pages base path.
2. Commit and push the generated files to `main`.
3. In **Settings → Pages**, set the source to `main` + `/docs` (one-time setup).
4. GitHub will publish the Next.js build to `https://Vijayarvind10.github.io/Fiz_all` in a few minutes.

> Tip: the Next.js app itself is meant for Vercel, Netlify, or any host that supports Node.js. GitHub Pages here is for documentation/marketing handoff only.

## ✅ Deployment Checklist

1. `npm run lint`
2. `npm run build`
3. Commit & push to `main`
4. (Optional) Deploy the Next.js app to Vercel or another hosting provider.

## 🧭 Roadmap Ideas

1. Persist onboarding data and obligations via a database (Prisma + Postgres).
2. Generate reminder events + transactional email/SMS via Resend, Postmark, or Twilio.
3. Add analytics on completion rates and unhandled obligations.
4. Expand action templates with regional logic (state-specific DMV links, etc.).
5. Layer in custom obligations and attachments for document vault users.

Questions or feedback? Open an issue — this repo is ready to evolve into the production build.
