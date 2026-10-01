import * as React from "react"
import { NavLink } from "react-router-dom"
import "./Footer.css"

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/plans", label: "Plans" },
  { to: "/contact", label: "Contact" },
]

export default function Footer() {
  return (
    <footer className="avn-footer">
      <div className="avn-container avn-footer-inner">
        <div>
          <div className="avn-footer-brand">AVNEDIT</div>
          <p className="avn-footer-tagline">AI Graphic Design • Video Editing • Creative Services</p>
        </div>
        <nav className="avn-footer-links" aria-label="Footer">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <p className="avn-footer-copyright">© 2026 AVNEDIT. All rights reserved.</p>
    </footer>
  )
}
