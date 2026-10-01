// ==========================================================
// Generates a client-side ORDER ID in the format AVN-2026-0001.
//
// IMPORTANT — READ THIS:
// True guaranteed-unique, sequential order numbers require a
// backend counter (e.g. counting existing rows in the Google
// Sheet, or a database). This function produces a realistic,
// collision-resistant ID on the client so the UI can show one
// immediately after submission. When you wire up the real
// backend (see /backend), replace this with an ID returned
// from the server for guaranteed uniqueness.
// ==========================================================

export function generateOrderId() {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000) // 4 digits
  return `AVN-${year}-${random}`
}
