import * as React from "react"
import { SERVICE_LABELS, formatPrice } from "../../../data/plans.js"

export default function OrderSummaryStep({ plan, order, submitting, submitError, onSubmit }) {
  const { customer, serviceEntries, otherRequest, filesNote, deadline, customerCode } = order

  return (
    <div>
      <h2 className="avn-wizard-step-title">Order Summary</h2>
      <p className="avn-wizard-step-desc">Review everything before sending your request to AVNEDIT.</p>

      <div className="avn-summary-block">
        <h4>Your Details</h4>
        <div className="avn-summary-row">
          <span>Name</span>
          <span>{customer.name || "—"}</span>
        </div>
        <div className="avn-summary-row">
          <span>Email</span>
          <span>{customer.email || "—"}</span>
        </div>
      </div>

      <div className="avn-summary-block">
        <h4>Selected Plan</h4>
        <div className="avn-summary-row">
          <span>Plan</span>
          <span>
            {plan.name} — {formatPrice(plan.price)}
          </span>
        </div>
        <div className="avn-summary-row">
          <span>Revisions Included</span>
          <span>{plan.revisionCount}</span>
        </div>
      </div>

      {plan.services.map((service) => {
        const entries = serviceEntries[service.type] || []
        if (entries.length === 0) return null
        return (
          <div className="avn-summary-block" key={service.type}>
            <h4>{SERVICE_LABELS[service.type]}</h4>
            {entries.map((entry, i) => {
              const title = entry.title || entry.videoTitle || entry.topic || entry.websiteType || `Item ${i + 1}`
              return (
                <div className="avn-summary-row" key={i}>
                  <span>
                    {SERVICE_LABELS[service.type]} {entries.length > 1 ? i + 1 : ""}
                  </span>
                  <span>{title}</span>
                </div>
              )
            })}
          </div>
        )
      })}

      {otherRequest && (
        <div className="avn-summary-block">
          <h4>Other / Custom Request</h4>
          <p style={{ fontSize: 14, color: "#d7e4ff" }}>{otherRequest}</p>
        </div>
      )}

      {filesNote && (
        <div className="avn-summary-block">
          <h4>Additional Files / References</h4>
          <p style={{ fontSize: 14, color: "#d7e4ff" }}>{filesNote}</p>
        </div>
      )}

      <div className="avn-summary-block">
        <h4>Customer Code</h4>
        <div className="avn-summary-row">
          <span>Code</span>
          <span>{customerCode || "—"}</span>
        </div>
      </div>

      <div className="avn-unlimited-note" style={{ marginTop: 8 }}>
        Payment and final project details will be discussed directly with AVNEDIT after reviewing your
        requirements.
      </div>

      {submitError && <p className="avn-submit-error">{submitError}</p>}

      <button
        type="button"
        className="avn-btn avn-btn-primary avn-btn-full"
        style={{ marginTop: 24 }}
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Confirm Project Request"}
      </button>
    </div>
  )
}
