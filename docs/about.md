---
layout: default
title: "About"
permalink: /about/
---

## Product promise

> “Nothing in your life will catch you by surprise anymore.”

Life Admin Control Center is built for first-time adults — renting their first apartment, driving their first car, juggling visas, insurance, and health maintenance without a reliable system. The product monitors the stressful timelines and delivers a calm, actionable warning before each one hits.

- **Housing:** notice deadlines, lease renewals, landlord communications.
- **Identity & legal:** driver’s licenses, passports, visas, OPT/EAD renewals.
- **Transport:** Insurance re-shopping scripts, registration/smog reminders.
- **Health:** Dentist cadence, preventative care, medication refills.

## Monetisation

- Free tier: dashboard + email reminders + copyable scripts.
- Pro tier: SMS alerts, auto-filled legal letters with timestamps, secure document vault, custom deadlines, proof tracking.

## MVP scope

- Landing page with clear value proposition and trust messaging.
- Multi-step onboarding wizard that collects the dates that matter.
- Dashboard timeline with urgency badges, action modals, and Pro upsell.
- Settings for notification channels and timeline maintenance.

## Next steps

1. Wire the onboarding form to a persistence layer (`Obligation`, `ReminderSchedule` tables).
2. Connect reminder cron to a transactional email/SMS service.
3. Localise action templates by state/country, starting with the highest-usage regions.
4. Add completion state history so users can see what they previously handled.

Questions or feedback? Open an issue on GitHub — the roadmap grows with you.
