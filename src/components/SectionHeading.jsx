import * as React from "react"

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="avn-section-heading">
      {eyebrow && <span className="avn-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
