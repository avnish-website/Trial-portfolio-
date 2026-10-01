import * as React from "react"
import { useNavigate } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import ServiceCard from "../components/ServiceCard.jsx"
import "./Services.css"

const SERVICES = [
  { name: "YouTube Video Editing", description: "Full long-form edits — pacing, transitions, sound design and colour." },
  { name: "Reel Editing", description: "Short-form edits built for retention on Reels, Shorts and TikTok." },
  { name: "Thumbnail Design", description: "Click-worthy thumbnails with strong contrast and clear focal points." },
  { name: "AI Graphic Design", description: "AI-assisted graphics for posts, covers, banners and promo visuals." },
  { name: "Video Script Writing", description: "Structured scripts written for your platform, tone and audience." },
  { name: "Custom Website Creation", description: "Premium, responsive websites built around your brand." },
  { name: "Advanced Creative Work", description: "Larger or custom creative requests that combine multiple services." },
]

export default function Services() {
  const navigate = useNavigate()
  return (
    <div className="avn-page avn-container">
      <SectionHeading eyebrow="What We Offer" title="Services" subtitle="Every service AVNEDIT provides, in one place." />
      <div className="avn-services-grid">
        {SERVICES.map((s) => (
          <ServiceCard
            key={s.name}
            name={s.name}
            description={s.description}
            ctaLabel="Get Started"
            onClick={() => navigate("/plans")}
          />
        ))}
      </div>
    </div>
  )
}
