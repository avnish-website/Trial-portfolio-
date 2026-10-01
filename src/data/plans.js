// ==========================================================
// AVNEDIT — CENTRAL PLAN DATA
// Single source of truth for pricing, features, and which
// service fields the order wizard should generate.
// Edit prices/features here only — every page reads from this file.
// ==========================================================

export const SERVICE_LABELS = {
  video: "YouTube Video Edit",
  reel: "Reel Edit",
  thumbnail: "Thumbnail Design",
  graphic: "Graphic / Thumbnail Design",
  script: "Video Script Writing",
  website: "Custom Website",
}

// "category" drives which Google Sheet an order is sent to on the backend
// (see backend/api/orders.js) — "video" and "graphic" each have their own
// webhook URL, kept in separate Vercel environment variables.
export const plans = [
  {
    id: "basic",
    category: "video",
    name: "Basic",
    price: 5,
    revisionCount: 1,
    featured: false,
    badge: null,
    buttonLabel: "Choose Basic",
    displayFeatures: [
      "1 Reel Edit",
      "1 Thumbnail Design",
      "1 Video Script Writing",
      "1 Revision / Remake",
    ],
    services: [
      { type: "reel", count: 1 },
      { type: "thumbnail", count: 1 },
      { type: "script", count: 1 },
    ],
  },
  {
    id: "basicPlus",
    category: "video",
    name: "Basic Plus",
    price: 9,
    revisionCount: 2,
    featured: false,
    badge: null,
    buttonLabel: "Choose Basic Plus",
    displayFeatures: [
      "2 Reel Edits",
      "2 Thumbnail Designs",
      "2 Video Script Writing",
      "2 Revisions / Remakes",
    ],
    services: [
      { type: "reel", count: 2 },
      { type: "thumbnail", count: 2 },
      { type: "script", count: 2 },
    ],
  },
  {
    id: "medium",
    category: "video",
    name: "Medium",
    price: 20,
    revisionCount: 2,
    featured: true,
    badge: "MOST POPULAR",
    buttonLabel: "Choose Medium",
    displayFeatures: [
      "1 YouTube Video Edit",
      "Unlimited Thumbnail Design",
      "Unlimited Video Script Writing",
      "2 Revisions / Remakes",
    ],
    services: [
      { type: "video", count: 1 },
      { type: "thumbnail", count: 1, unlimited: true },
      { type: "script", count: 1, unlimited: true },
    ],
  },
  {
    id: "advanced",
    category: "video",
    name: "Advanced",
    price: 39,
    revisionCount: 3,
    featured: false,
    badge: null,
    buttonLabel: "Choose Advanced",
    displayFeatures: [
      "1 Custom Website",
      "3 YouTube Video Edits",
      "Advanced Thumbnail Design",
      "Unlimited Video Script Writing",
      "3 Revisions / Remakes",
    ],
    services: [
      { type: "website", count: 1 },
      { type: "video", count: 3 },
      { type: "thumbnail", count: 1, unlimited: true, advanced: true },
      { type: "script", count: 1, unlimited: true },
    ],
  },
  {
    id: "elite",
    category: "video",
    name: "Elite",
    price: 69,
    revisionCount: 3,
    featured: false,
    badge: null,
    buttonLabel: "Choose Elite",
    displayFeatures: [
      "5 YouTube Video Edits",
      "5 Reel Edits",
      "Advanced Custom Website",
      "15 Thumbnail Designs",
      "15 Video Script Writing",
      "3 Revisions / Remakes",
    ],
    services: [
      { type: "video", count: 5 },
      { type: "reel", count: 5 },
      { type: "website", count: 1, advanced: true },
      { type: "thumbnail", count: 15 },
      { type: "script", count: 15 },
    ],
  },
]

// Separate pricing track for Graphic / Thumbnail Design only —
// shown in its own carousel below the main Plans, and routed to
// its own Google Sheet (category: "graphic").
export const graphicPlans = [
  {
    id: "graphicBasic",
    category: "graphic",
    name: "Basic",
    price: 0.5,
    revisionCount: 1,
    featured: false,
    badge: null,
    buttonLabel: "Choose Basic",
    priceUnit: "/ plan",
    displayFeatures: ["2 Graphic / Thumbnail Designs", "1 Revision / Remake"],
    services: [{ type: "graphic", count: 2 }],
  },
  {
    id: "graphicBasicPlus",
    category: "graphic",
    name: "Basic Plus",
    price: 1,
    revisionCount: 2,
    featured: false,
    badge: null,
    buttonLabel: "Choose Basic Plus",
    priceUnit: "/ plan",
    displayFeatures: ["5 Graphic / Thumbnail Designs", "2 Revisions / Remakes"],
    services: [{ type: "graphic", count: 5 }],
  },
  {
    id: "graphicMedium",
    category: "graphic",
    name: "Medium",
    price: 10,
    revisionCount: 2,
    featured: true,
    badge: "MOST POPULAR",
    buttonLabel: "Choose Medium",
    priceUnit: "/ plan",
    displayFeatures: ["15 Graphic / Thumbnail Designs", "2 Revisions / Remakes"],
    services: [{ type: "graphic", count: 15 }],
  },
  {
    id: "graphicAdvanced",
    category: "graphic",
    name: "Advanced",
    price: 20,
    revisionCount: 3,
    featured: false,
    badge: null,
    buttonLabel: "Choose Advanced",
    priceUnit: "/ 1 month",
    displayFeatures: [
      "1 Design Per Day",
      "For 1 Month",
      "One active request at a time",
      "3 Revisions / Remakes",
    ],
    services: [{ type: "graphic", count: 1, unlimited: true, cadenceNote: "1 design per day, for 1 month" }],
  },
  {
    id: "graphicElite",
    category: "graphic",
    name: "Elite",
    price: 50,
    revisionCount: 3,
    featured: false,
    badge: null,
    buttonLabel: "Choose Elite",
    priceUnit: "/ 6 months",
    displayFeatures: [
      "Automation Plan",
      "1 Design Per Day",
      "For 6 Months",
      "One active request at a time",
      "3 Revisions / Remakes",
    ],
    services: [{ type: "graphic", count: 1, unlimited: true, cadenceNote: "1 design per day, for 6 months" }],
  },
]

export function getPlanById(id) {
  return plans.find((p) => p.id === id) || graphicPlans.find((p) => p.id === id) || null
}

// $5 -> "$5", $0.5 -> "$0.50"
export function formatPrice(price) {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`
}
