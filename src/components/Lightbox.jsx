import * as React from "react"
import "./Lightbox.css"

// Full-screen viewer for a project image or video. Tap outside,
// press Escape or tap the close button to dismiss.
export default function Lightbox({ item, onClose }) {
  React.useEffect(() => {
    if (!item) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function onKey(e) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="avn-lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button type="button" className="avn-lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <div className="avn-lightbox-frame" onClick={(e) => e.stopPropagation()}>
        {item.video ? (
          <video src={item.video} poster={item.image} controls autoPlay loop playsInline />
        ) : (
          <img src={item.image} alt={item.title} />
        )}
        <p className="avn-lightbox-caption">{item.title}</p>
      </div>
    </div>
  )
}
