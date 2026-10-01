import * as React from "react"
import { NavLink } from "react-router-dom"
import "./BottomNav.css"

const ICONS = {
  Home: (
    <path d="M4 11.5L12 5l8 6.5M6 10v9h12v-9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  About: (
    <>
      <circle cx="12" cy="8" r="3.2" strokeWidth="1.8" />
      <path d="M5 20c1.2-3.8 4-5.5 7-5.5s5.8 1.7 7 5.5" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  Services: (
    <path d="M4 7h16M4 12h16M4 17h10" strokeWidth="1.8" strokeLinecap="round" />
  ),
  Projects: (
    <rect x="4" y="5" width="16" height="14" rx="2.4" strokeWidth="1.8" />
  ),
  Plans: (
    <path d="M5 19V9l7-5 7 5v10M9 19v-6h6v6" strokeWidth="1.8" strokeLinejoin="round" />
  ),
  Contact: (
    <path d="M4 6h16v12H4z M4 6l8 7 8-7" strokeWidth="1.8" strokeLinejoin="round" />
  ),
}

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/plans", label: "Plans" },
  { to: "/contact", label: "Contact" },
]

export default function BottomNav() {
  return (
    <nav className="avn-bottomnav" aria-label="Primary">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          className={({ isActive }) =>
            isActive ? "avn-bottomnav-item avn-bottomnav-active" : "avn-bottomnav-item"
          }
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            {ICONS[link.label]}
          </svg>
          <span>{link.label}</span>
          <span className="avn-bottomnav-dot" aria-hidden="true" />
        </NavLink>
      ))}
    </nav>
  )
}
