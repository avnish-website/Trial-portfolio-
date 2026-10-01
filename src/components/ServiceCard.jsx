import * as React from "react"
import "./ServiceCard.css"

export default function ServiceCard({ icon, name, description, ctaLabel = "Learn More", onClick }) {
  return (
    <article className="avn-service-card avn-card avn-scroll-reveal">
      <div className="avn-service-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="avn-service-name">{name}</h3>
      <p className="avn-service-desc">{description}</p>
      <button type="button" className="avn-service-cta" onClick={onClick}>
        {ctaLabel} →
      </button>
    </article>
  )
}
