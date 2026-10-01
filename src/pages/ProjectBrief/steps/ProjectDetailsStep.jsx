import * as React from "react"
import ServiceEntryFields from "./ServiceEntryFields.jsx"
import { SERVICE_LABELS } from "../../../data/plans.js"
import "../ProjectBriefWizard.css"

const PLURAL_LABELS = {
  video: "YouTube Video Edits",
  reel: "Reel Edits",
  thumbnail: "Thumbnail Designs",
  graphic: "Graphic / Thumbnail Designs",
  script: "Video Scripts",
  website: "Custom Website",
}

// Auto-generates one collapsible field group per deliverable, based
// entirely on the selected plan's `services` array — the customer
// never manually picks services, and everything is filled in one form.
export default function ProjectDetailsStep({ plan, serviceEntries, errors, onFieldChange, otherRequest, onOtherRequestChange }) {
  return (
    <div>
      <h2 className="avn-wizard-step-title">Project Details</h2>
      <p className="avn-wizard-step-desc">
        Based on your <strong>{plan.name}</strong> plan, here's everything included. Fill in the details for
        each item below.
      </p>

      {plan.services.map((service) => {
        const entries = serviceEntries[service.type] || []
        return (
          <div className="avn-service-block" key={service.type}>
            <h3 className="avn-service-block-title">{PLURAL_LABELS[service.type]}</h3>

            {service.unlimited && (
              <p className="avn-unlimited-note">
                "Unlimited" means one active request at a time. Fill in your first request below — once
                it's completed, you can submit the next one the same way, over Gmail.
              </p>
            )}

            {service.cadenceNote && (
              <p className="avn-unlimited-note">Your plan includes: {service.cadenceNote}.</p>
            )}

            {entries.map((entry, i) => (
              <ServiceEntryFields
                key={i}
                type={service.type}
                index={i}
                entry={entry}
                errors={errors?.[service.type]?.[i]}
                onFieldChange={onFieldChange}
                defaultOpen={i === 0}
                badgeText={
                  entries.length > 1
                    ? `${SERVICE_LABELS[service.type]} ${i + 1}`
                    : SERVICE_LABELS[service.type]
                }
              />
            ))}
          </div>
        )
      })}

      <div className="avn-service-block">
        <h3 className="avn-service-block-title">Other / Custom Request</h3>
        <textarea
          className="avn-other-request-textarea"
          rows={4}
          placeholder="Anything not covered above? Describe it here."
          value={otherRequest}
          onChange={(e) => onOtherRequestChange(e.target.value)}
          style={{
            width: "100%",
            background: "var(--avn-bg-elevated)",
            border: "1px solid var(--avn-border)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "var(--avn-white)",
            fontFamily: "var(--avn-font-body)",
            fontSize: 14.5,
          }}
        />
      </div>
    </div>
  )
}
