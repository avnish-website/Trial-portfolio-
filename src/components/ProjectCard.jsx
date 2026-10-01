import * as React from "react"
import Lightbox from "./Lightbox.jsx"
import "./ProjectCard.css"

// A project of null renders the "coming soon" placeholder card.
export default function ProjectCard({ project }) {
  const [open, setOpen] = React.useState(false)
  const videoRef = React.useRef(null)
  const previewClip = project?.previewClip

  // Play the looping preview only while the card is on screen (saves battery + data on phones).
  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [previewClip])

  if (!project) {
    return (
      <article className="avn-project-card avn-project-card-empty avn-card avn-scroll-reveal">
        <div className="avn-project-empty-icon" aria-hidden="true">
          ✦
        </div>
        <p>Project Coming Soon</p>
      </article>
    )
  }

  const { title, category, coverImage, description, videoLink, externalLink, featured } = project
  const alt = `${title} — ${category} by AVNEDIT`

  return (
    <article className="avn-project-card avn-card avn-scroll-reveal">
      <button
        type="button"
        className="avn-project-cover"
        onClick={() => setOpen(true)}
        aria-label={`Open ${title}`}
      >
        {coverImage && (
          <div className="avn-project-cover-bg" style={{ backgroundImage: `url(${coverImage})` }} aria-hidden="true" />
        )}
        {previewClip ? (
          <video
            ref={videoRef}
            className="avn-project-media"
            src={previewClip}
            poster={coverImage}
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={alt}
          />
        ) : (
          coverImage && <img className="avn-project-media" src={coverImage} alt={alt} loading="lazy" />
        )}
        {featured && <span className="avn-project-featured-badge">Featured</span>}
        {previewClip && <span className="avn-project-play-badge">▶ Tap to watch</span>}
      </button>

      <div className="avn-project-body">
        <span className="avn-project-category">{category}</span>
        <h3 className="avn-project-title">{title}</h3>
        {description && <p className="avn-project-desc">{description}</p>}
        {(videoLink || externalLink) && (
          <div className="avn-project-links">
            {videoLink && (
              <a href={videoLink} target="_blank" rel="noreferrer">
                Watch ↗
              </a>
            )}
            {externalLink && (
              <a href={externalLink} target="_blank" rel="noreferrer">
                Visit ↗
              </a>
            )}
          </div>
        )}
      </div>

      {open && (
        <Lightbox
          item={{ title, image: coverImage, video: previewClip }}
          onClose={() => setOpen(false)}
        />
      )}
    </article>
  )
}
