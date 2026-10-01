import * as React from "react"
import { NavLink } from "react-router-dom"
import Logo from "./Logo.jsx"
import "./Navbar.css"

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/plans", label: "Plans" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  return (
    <header className="avn-navbar">
      <div className="avn-navbar-inner avn-container">
        <NavLink to="/" className="avn-navbar-logo" aria-label="AVNEDIT home">
          <Logo />
        </NavLink>
        <nav className="avn-navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive ? "avn-navlink avn-navlink-active" : "avn-navlink"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
