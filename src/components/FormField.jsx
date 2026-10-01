import * as React from "react"
import "./FormField.css"

// Generic field renderer used across the whole Project Brief wizard —
// text / textarea / url / select, all sharing the same label,
// hint and error styling so the form stays visually consistent.
export default function FormField({ field, value, onChange, error }) {
  const { name, label, type, required, placeholder, options } = field
  const inputId = `field-${name}-${label}`.replace(/\s+/g, "-")

  return (
    <div className="avn-form-field">
      <label htmlFor={inputId}>
        {label}
        {required && <span className="avn-required-star"> *</span>}
      </label>

      {type === "textarea" && (
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          aria-invalid={!!error}
        />
      )}

      {type === "select" && (
        <select id={inputId} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {(type === "text" || type === "url" || !type) && (
        <input
          id={inputId}
          type={type === "url" ? "url" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
        />
      )}

      {error && <p className="avn-field-error">{error}</p>}
    </div>
  )
}
