import * as React from "react"
import FormField from "../../../components/FormField.jsx"
import { FIELD_SCHEMAS } from "../../../data/serviceFieldSchemas.js"
import "./ServiceEntryFields.css"

// Renders the field group for ONE deliverable entry (e.g. "Video Edit 2").
// Wrapped in a native <details> so plans with many entries (Elite: 15
// thumbnails, 15 scripts) don't turn the page into an overwhelming wall
// of inputs — only the first entry of each service starts expanded.
export default function ServiceEntryFields({ type, index, entry, errors, onFieldChange, defaultOpen, badgeText }) {
  const schema = FIELD_SCHEMAS[type] || []

  return (
    <details className="avn-entry-group avn-card" open={defaultOpen}>
      <summary>
        <span>{badgeText}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="avn-entry-group-body">
        {schema.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={entry[field.name] || ""}
            onChange={(val) => onFieldChange(type, index, field.name, val)}
            error={errors?.[field.name]}
          />
        ))}
      </div>
    </details>
  )
}
