// ==========================================================
// API layer — talks to YOUR backend, never to Google directly.
//
// The frontend sends the finished order to POST /api/orders.
// A server-side function (see /backend/api/orders.js) then
// forwards it to Google Sheets using a webhook URL that is
// stored as a server environment variable — it never touches
// the browser, so it can't be seen in devtools or leaked.
//
// This function deliberately does NOT swallow errors. If the
// request fails, the caller (OrderSummaryStep) must show a
// real error message and let the customer retry without
// losing their entered data.
// ==========================================================

export async function submitOrder(orderPayload) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
  })

  if (!response.ok) {
    let message = "Something went wrong while submitting your request. Please try again."
    try {
      const data = await response.json()
      if (data?.error) message = data.error
    } catch {
      // response wasn't JSON — keep default message
    }
    throw new Error(message)
  }

  return response.json() // expected: { orderId, customerCode }
}
