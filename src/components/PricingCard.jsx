import * as React from "react"
import { formatPrice } from "../data/plans.js"
import "./PricingCard.css"

export default function PricingCard({ plan, onChoose }) {
  const featured = !!plan.featured

  return (
    <article
      className={featured ? "avn-pricing-card avn-pricing-card-featured" : "avn-pricing-card"}
      aria-label={`${plan.name} plan, ${formatPrice(plan.price)}${featured ? ", most popular" : ""}`}
    >
      {plan.badge && <span className="avn-pricing-badge">{plan.badge}</span>}

      <h3 className="avn-pricing-name">{plan.name}</h3>
      <p className="avn-pricing-price">
        {formatPrice(plan.price)}
        <span> {plan.priceUnit || "/ project"}</span>
      </p>

      <ul className="avn-pricing-features">
        {plan.displayFeatures.map((feature, i) => (
          <li key={i}>
            <span className="avn-pricing-check" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="avn-pricing-btn"
        onClick={() => onChoose(plan)}
        aria-label={`${plan.buttonLabel} — ${formatPrice(plan.price)}`}
      >
        {plan.buttonLabel}
      </button>
    </article>
  )
}
