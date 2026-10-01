// ==========================================================
// POST /api/orders   (Vercel Serverless Function — must live in /api at project root)
//
// Video-plan orders  -> Google Sheet #1  (env: GOOGLE_SHEETS_WEBHOOK_URL)
// Graphic-plan orders -> Google Sheet #2 (env: GOOGLE_SHEETS_WEBHOOK_URL_GRAPHIC)
//
// The webhook URLs live only in Vercel environment variables — never in browser code.
// See backend/README.md for the Google Apps Script to paste into each sheet.
// ==========================================================

function generateServerOrderId() {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `AVN-${year}-${random}`
}

function humanize(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())
}

const DRIVE_KEYS = ["footageLink", "assetsLink", "brandAssetsLink"]
const REFERENCE_KEYS = ["referenceLink", "referenceThumbnail", "reference", "referenceWebsites"]

function summarise(serviceEntries = {}) {
  const requirements = []
  const drive = []
  const reference = []
  const deadlines = []

  Object.entries(serviceEntries).forEach(([type, entries]) => {
    ;(entries || []).forEach((entry, i) => {
      const lines = []
      Object.entries(entry || {}).forEach(([key, value]) => {
        const v = String(value ?? "").trim()
        if (!v) return
        lines.push(`${humanize(key)}: ${v}`)
        if (DRIVE_KEYS.includes(key)) drive.push(v)
        if (REFERENCE_KEYS.includes(key)) reference.push(v)
        if (key === "deadline") deadlines.push(v)
      })
      if (lines.length) requirements.push(`[${humanize(type)} ${i + 1}]\n${lines.join("\n")}`)
    })
  })

  return {
    requirements: requirements.join("\n\n"),
    driveLinks: drive.join("\n"),
    referenceLinks: reference.join("\n"),
    deadline: deadlines[0] || "",
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  const order = req.body

  if (!order?.customer?.email || !order?.customer?.name || !order?.selectedPlan?.id || !order?.customerCode) {
    res.status(400).json({ error: "Missing required order fields." })
    return
  }

  const isGraphic = order.selectedPlan.category === "graphic"
  const webhookUrl = isGraphic ? process.env.GOOGLE_SHEETS_WEBHOOK_URL_GRAPHIC : process.env.GOOGLE_SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    res.status(500).json({
      error: "Order could not be saved: the Google Sheets connection isn't configured yet. Please try again later.",
    })
    return
  }

  const orderId = generateServerOrderId()
  const { requirements, driveLinks, referenceLinks, deadline } = summarise(order.serviceEntries)

  const row = {
    date: new Date().toISOString(),
    orderId,
    customerCode: order.customerCode,
    selectedPlan: order.selectedPlan.name,
    planPrice: order.selectedPlan.price,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    selectedServices: Object.keys(order.serviceEntries || {})
      .filter((type) => (order.serviceEntries[type] || []).length > 0)
      .join(", "),
    requirements,
    referenceLinks,
    driveLinks,
    deadline,
    otherRequest: order.otherRequest || "",
    filesNote: order.filesNote || "",
    orderStatus: "New",
    paymentStatus: "Discussing",
  }

  try {
    const sheetsResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      redirect: "follow",
    })

    if (!sheetsResponse.ok) throw new Error(`Sheets webhook responded with ${sheetsResponse.status}`)

    // Our Apps Script replies {ok:true}; treat {ok:false} as a real failure.
    const text = await sheetsResponse.text()
    try {
      if (JSON.parse(text)?.ok === false) throw new Error("Apps Script reported an error")
    } catch (parseErr) {
      if (parseErr.message === "Apps Script reported an error") throw parseErr
    }

    res.status(200).json({ orderId, customerCode: order.customerCode })
  } catch (err) {
    console.error("Failed to forward order to Google Sheets:", err)
    res.status(500).json({ error: "Something went wrong while submitting your request. Please try again." })
  }
}
