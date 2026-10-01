import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import ServiceCard from "../components/ServiceCard.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { PROJECTS } from "../data/projects.js"
import "./Home.css"

const FEATURED_SERVICES = [
  { name: "YouTube Video Editing", description: "Polished, retention-focused edits for long-form content." },
  { name: "Reel Editing", description: "Fast-paced, scroll-stopping short-form edits." },
  { name: "Thumbnail Design", description: "High-contrast thumbnails designed to earn the click." },
]

export default function Home() {
  const navigate = useNavigate()

  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="avn-page">
      <section className="avn-hero avn-container">
        <div className="avn-hero-logo">
          <img src="/logo-avnish.jpg" alt="AVNEDIT brand mark" width="132" height="132" />
        </div>
        <span className="avn-eyebrow">AI Graphic Designer • Video Editor • Creative Designer</span>
        <h1 className="avn-hero-title">AVNEDIT</h1>
        <p className="avn-hero-intro">
          AVNEDIT creates modern visual content and digital experiences through AI graphic design,
          thumbnail design, video editing, scripts and custom websites.
        </p>
        <div className="avn-hero-ctas">
          <button className="avn-btn avn-btn-primary" onClick={() => navigate("/projects")}>
            View My Work
          </button>
          <button className="avn-btn avn-btn-secondary" onClick={() => navigate("/plans")}>
            Explore Plans
          </button>
        </div>
      </section>

      <section className="avn-container" style={{ marginTop: 72 }}>
        <SectionHeading eyebrow="Featured Work" title="Selected Projects" subtitle="A quick look at the kind of work AVNEDIT creates." />
        <div className="avn-home-projects-grid">
          {featured.length > 0
            ? featured.map((p) => <ProjectCard key={p.title} project={p} />)
            : [0, 1, 2].map((i) => <ProjectCard key={i} project={null} />)}
        </div>
      </section>

      <section className="avn-container" style={{ marginTop: 80 }}>
        <SectionHeading eyebrow="What AVNEDIT Does" title="Services" />
        <div className="avn-home-services-grid">
          {FEATURED_SERVICES.map((s) => (
            <ServiceCard key={s.name} name={s.name} description={s.description} onClick={() => navigate("/services")} />
          ))}
        </div>
        <div className="avn-home-services-cta">
          <Link to="/services" className="avn-btn avn-btn-ghost">
            See All Services →
          </Link>
        </div>
      </section>

      <section className="avn-container avn-home-cta-band avn-card" style={{ marginTop: 88 }}>
        <h2>Have a project in mind?</h2>
        <p>Pick a plan that fits your project and tell AVNEDIT what you need.</p>
        <button className="avn-btn avn-btn-primary" onClick={() => navigate("/plans")}>
          Explore Plans
        </button>
      </section>
    </div>
  )
}
