# AVNEDIT — Production Website

Premium creative-studio website for AVNEDIT, built with React + Vite. Mobile-first,
8 pages, plan selection flow, and a full 5-step order wizard.

## What's inside

```
src/
  data/plans.js                 ← single source of truth for pricing & plan services
  data/serviceFieldSchemas.js   ← form fields per deliverable type (video/reel/thumbnail/script/website)
  context/OrderContext.jsx      ← order state shared across Plans → wizard → confirmation
  components/                   ← Navbar, BottomNav, Footer, PricingCarousel, PlanConfirmationModal, etc.
  pages/                        ← Home, About, Services, Projects, Plans, Contact
  pages/ProjectBrief/           ← the 5-step order wizard
  pages/OrderConfirmation.jsx
backend/
  api/orders.js                 ← POST /api/orders — forwards orders to Google Sheets securely
  README.md                     ← step-by-step Google Sheets connection guide (no laptop needed)
```

## Running this — since you're on mobile

Vite needs Node.js to run its dev server, which a phone can't do directly. The realistic
path for a mobile-only workflow is:

**Option A — GitHub + Vercel (recommended, fully phone-friendly)**
1. Create a free GitHub account (github.com, works fine in mobile browser)
2. Create a new repository, use GitHub's web uploader to upload this whole folder
   (or use the GitHub mobile app, which supports file uploads)
3. Go to vercel.com → **New Project** → import that GitHub repo
4. Vercel auto-detects Vite and deploys it — you get a live URL in ~1 minute
5. Every time you push a change to GitHub, Vercel redeploys automatically

This also makes `/api/orders.js` work automatically (Vercel turns files in `/api` into
live serverless endpoints) — you just need to add the `GOOGLE_SHEETS_WEBHOOK_URL`
environment variable as described in `backend/README.md`.

**Option B — StackBlitz (instant preview, no deploy)**
Go to stackblitz.com on your phone, choose "Import from GitHub" (after Option A step 2),
or create a new Vite + React project there and paste these files in. You get a live
preview immediately, editable from the phone browser.

**Option C — borrow a laptop occasionally**
If you ever get access to a computer: `npm install` then `npm run dev` runs it locally.

## Connecting this to your existing Framer project

This is a separate, standalone implementation from the `AVNEDITPlans` Framer Code
Component built earlier. You have two realistic paths:

1. **Replace Framer entirely** — deploy this React app (Option A above) and point your
   domain at it instead of Framer. You get full control over the order flow, wizard,
   and Google Sheets integration, which Framer alone can't do without custom code.
2. **Keep Framer for marketing pages, link out for ordering** — keep Home/About/Services
   in Framer as-is, and set the Plans page's "Explore Plans" buttons to link to this
   app's `/plans` route once deployed, so the order flow lives here.

Given the order wizard's complexity (5 steps, dynamic fields, validation, Google Sheets),
trying to rebuild all of it natively inside Framer would eat through your ~200 AI credits
fast — this standalone app is the more realistic path for that specific piece.

## Design tokens

All colors, spacing and fonts are defined once in `src/index.css` under `:root`. Change
a value there and it updates everywhere.

## What's intentionally NOT implemented (as scoped)

- Online payment (Stripe/PayPal) — payment is discussed manually over Gmail
- Real Gmail address — placeholder `YOUR-GMAIL-HERE` used in Contact.jsx and
  OrderConfirmation.jsx; replace once you have the address
- Google Sheets credentials — see backend/README.md, this requires your own 10-minute
  one-time setup (no code needed, just Google Sheets UI)
