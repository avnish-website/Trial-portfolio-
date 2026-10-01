import * as React from "react"
import SectionHeading from "../components/SectionHeading.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { PROJECTS } from "../data/projects.js"
import "./Projects.css"

const ALL_CATEGORIES = ["Video Editing", "Reel Editing", "Thumbnail Design", "Graphic Design", "AI Design", "Website Design"]

// Only show filter chips for categories that actually have projects.
const CATEGORIES = ["All", ...ALL_CATEGORIES.filter((c) => PROJECTS.some((p) => p.category === c))]

export default function Projects() {
  const [activeCategory, setActiveCategory] = React.useState("All")

  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div className="avn-page avn-container">
      <SectionHeading eyebrow="Portfolio" title="Projects" subtitle="A showcase of AVNEDIT's creative work. Tap any project to view it full screen." />

      <div className="avn-projects-filters" role="tablist" aria-label="Project categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={activeCategory === cat ? "avn-filter-chip avn-filter-chip-active" : "avn-filter-chip"}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="avn-projects-empty avn-card">
          <p>Projects are being prepared. New creative work will appear here soon.</p>
        </div>
      ) : (
        <div className="avn-projects-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
