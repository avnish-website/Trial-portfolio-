// ==========================================================
// Shared form validation helpers used across the wizard steps.
// ==========================================================

export function isValidEmail(value) {
  if (!value) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isValidCustomerCode(value) {
  if (!value) return false
  // Letters and numbers only, no spaces, 4-20 characters
  return /^[A-Za-z0-9]{4,20}$/.test(value.trim())
}

export function isValidUrl(value) {
  if (!value) return false
  try {
    const url = new URL(value.trim())
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function isNotEmpty(value) {
  return typeof value === "string" && value.trim().length > 0
}
