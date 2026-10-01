import * as React from "react"
import PricingCard from "./PricingCard.jsx"
import "./PricingCarousel.css"

// Renders all plans in a horizontally scrollable, snap-aligned row.
// On mobile, each card is ~78% width so the next card peeks in
// (~20%) to signal that more cards are swipeable. Only THIS
// container scrolls horizontally — never the page itself.
export default function PricingCarousel({ plans, onChoose }) {
  return (
    <div className="avn-carousel" role="list">
      {plans.map((plan) => (
        <div role="listitem" key={plan.id}>
          <PricingCard plan={plan} onChoose={onChoose} />
        </div>
      ))}
    </div>
  )
}
