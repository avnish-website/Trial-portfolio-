import * as React from "react"
import { Link } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import "./About.css"

const FOCUS_AREAS = [
  "AI Graphic Design",
  "Thumbnail Design",
  "Graphic Design",
  "Video Editing",
  "Reel Editing",
  "Script Writing",
  "Custom Websites",
]

const WHY_CARDS = [
  { title: "Creative & Original", desc: "Every piece of work is made specifically for your project — no recycled templates." },
  { title: "Detail Focused", desc: "Careful attention to pacing, typography, colour and composition in every deliverable." },
  { title: "Client-Focused", desc: "Clear communication and a process built around understanding what you actually need." },
]

export default function About() {
  return (
    <div className="avn-page avn-container">
      <div className="avn-about-hero">
        <h1>About AVNEDIT</h1>
        <p>Creative visuals. Intelligent design. Powerful storytelling.</p>
      </div>

      <section className="avn-about-focus">
        <SectionHeading title="What AVNEDIT Focuses On" />
        <div className="avn-about-focus-grid">
          {FOCUS_AREAS.map((area) => (
            <div key={area} className="avn-card avn-about-focus-item">
              {area}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 80 }}>
        <SectionHeading title="Why AVNEDIT" />
        <div className="avn-about-why-grid">
          {WHY_CARDS.map((card) => (
            <div key={card.title} className="avn-card avn-about-why-card">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="avn-card avn-about-cta" style={{ marginTop: 80 }}>
        <h2>Have a project in mind?</h2>
        <Link to="/plans" className="avn-btn avn-btn-primary">
          Explore Plans
        </Link>
      </section>
    </div>
  )
}
