import * as React from "react"
import { useNavigate } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import PricingCarousel from "../components/PricingCarousel.jsx"
import PlanConfirmationModal from "../components/PlanConfirmationModal.jsx"
import Lightbox from "../components/Lightbox.jsx"
import { plans, graphicPlans } from "../data/plans.js"
import { useOrder } from "../context/OrderContext.jsx"
import "./Plans.css"

// Sample work shown under each plan group. Swap the files in /public/projects to change them.
const TRIAL_VIDEO = {
  title: "Video editing sample",
  video: "/projects/video-youtube-growth.mp4",
  image: "/projects/video-youtube-growth-poster.jpg",
}

const TRIAL_IMAGES = [
  { title: "VYRA X1 — Smartphone Poster", image: "/projects/graphic-vyra-phone-ad.jpg" },
  { title: "Learn AI in 60 Sec — Poster", image: "/projects/graphic-learn-ai-poster.jpg" },
  { title: "Channel Logo Set", image: "/projects/graphic-channel-logos.jpg" },
]

export default function Plans() {
  const [pendingPlan, setPendingPlan] = React.useState(null)
  const [viewer, setViewer] = React.useState(null)
  const { selectPlan } = useOrder()
  const navigate = useNavigate()

  function handleContinue(plan) {
    selectPlan(plan.id) // resets order state and stores the chosen plan id
    setPendingPlan(null)
    navigate("/project-brief")
  }

  function jumpTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="avn-page">
      <div className="avn-container">
        <SectionHeading title="Choose Your Plan" subtitle="Choose the creative plan that fits your project." />

        <div className="avn-plan-tabs" role="tablist" aria-label="Plan type">
          <button type="button" className="avn-plan-tab" onClick={() => jumpTo("video-plans")}>
            Video Editing
          </button>
          <button type="button" className="avn-plan-tab" onClick={() => jumpTo("graphic-plans")}>
            Graphic Design
          </button>
        </div>
      </div>

      {/* ---------- VIDEO EDITING & CREATIVE PLANS ---------- */}
      <section id="video-plans" className="avn-plans-section">
        <div className="avn-container">
          <h2 className="avn-plans-group-title">Video Editing Plans</h2>
          <p className="avn-plans-group-sub">Reels, YouTube edits, thumbnails, scripts and websites.</p>
        </div>

        <PricingCarousel plans={plans} onChoose={setPendingPlan} />

        <div className="avn-container">
          <div className="avn-card avn-trial">
            <div className="avn-trial-head">
              <span className="avn-eyebrow">Sample Preview</span>
              <h3>See the editing quality</h3>
            </div>
            <video
              className="avn-trial-video"
              src={TRIAL_VIDEO.video}
              poster={TRIAL_VIDEO.image}
              controls
              playsInline
              preload="metadata"
              aria-label={TRIAL_VIDEO.title}
            />
          </div>
        </div>
      </section>

      {/* ---------- GRAPHIC DESIGN PLANS ---------- */}
      <section id="graphic-plans" className="avn-plans-section">
        <div className="avn-container">
          <h2 className="avn-plans-group-title">Graphic Design Plans</h2>
          <p className="avn-plans-group-sub">Thumbnails, posters, logos and social creatives.</p>
        </div>

        <PricingCarousel plans={graphicPlans} onChoose={setPendingPlan} />

        <div className="avn-container">
          <div className="avn-card avn-trial">
            <div className="avn-trial-head">
              <span className="avn-eyebrow">Sample Preview</span>
              <h3>Recent design samples</h3>
            </div>
            <div className="avn-trial-grid">
              {TRIAL_IMAGES.map((img) => (
                <button
                  key={img.image}
                  type="button"
                  className="avn-trial-thumb"
                  onClick={() => setViewer(img)}
                  aria-label={`Open ${img.title}`}
                >
                  <img src={img.image} alt={`${img.title} — graphic design sample by AVNEDIT`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <p className="avn-plans-group-note">
            Advanced and Elite graphic plans deliver 1 design per day, handled one active request at a time.
          </p>
        </div>
      </section>

      <div className="avn-container">
        <h2 className="avn-plans-subheading">How It Works</h2>
        <div className="avn-plans-steps">
          <div className="avn-card avn-plans-step">
            <span className="avn-plans-step-num">01</span>
            <div>
              <strong>Choose a plan</strong>
              <p>Pick the plan that matches what you need.</p>
            </div>
          </div>
          <div className="avn-card avn-plans-step">
            <span className="avn-plans-step-num">02</span>
            <div>
              <strong>Tell us what you need</strong>
              <p>Share your project details and reference links.</p>
            </div>
          </div>
          <div className="avn-card avn-plans-step">
            <span className="avn-plans-step-num">03</span>
            <div>
              <strong>Discuss the project</strong>
              <p>AVNEDIT follows up over Gmail to finalise everything.</p>
            </div>
          </div>
        </div>

        <div className="avn-plans-notes">
          <p>
            Unlimited services are handled one active request at a time and are subject to project scope and
            communication.
          </p>
          <p>
            Payment is discussed directly with AVNEDIT after reviewing your project requirements. No online payment is
            required at this stage.
          </p>
        </div>
      </div>

      <PlanConfirmationModal plan={pendingPlan} onCancel={() => setPendingPlan(null)} onContinue={handleContinue} />
      <Lightbox item={viewer} onClose={() => setViewer(null)} />
    </div>
  )
}
