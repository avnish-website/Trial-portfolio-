import * as React from "react"
import { formatPrice } from "../data/plans.js"
import "./PlanConfirmationModal.css"

export default function PlanConfirmationModal({ plan, onCancel, onContinue }) {
  const dialogRef = React.useRef(null)

  // Basic focus handling for accessibility — move focus into the
  // modal when it opens, and let Escape close it.
  React.useEffect(() => {
    if (!plan) return
    dialogRef.current?.focus()
    function handleKey(e) {
      if (e.key === "Escape") onCancel()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [plan, onCancel])

  if (!plan) return null

  return (
    <div className="avn-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div
        className="avn-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="avn-modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <h3 id="avn-modal-title">Choose {plan.name}?</h3>
        <p className="avn-modal-price">
          You selected the {plan.name} Plan — {formatPrice(plan.price)}
        </p>

        <ul className="avn-modal-features">
          {plan.displayFeatures.map((f, i) => (
            <li key={i}>
              <span aria-hidden="true">✓</span> {f}
            </li>
          ))}
        </ul>

        <div className="avn-modal-actions">
          <button type="button" className="avn-btn avn-btn-ghost avn-btn-full" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="avn-btn avn-btn-primary avn-btn-full" onClick={() => onContinue(plan)}>
            Continue
          </button>
        </div>

        <p className="avn-modal-note">
          Next you'll fill in a short project brief. Payment is discussed later, directly with AVNEDIT.
        </p>
      </div>
    </div>
  )
}
