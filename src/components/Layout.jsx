import * as React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import BottomNav from "./BottomNav.jsx"
import Footer from "./Footer.jsx"

export default function Layout() {
  // Reveal any element with .avn-scroll-reveal as it scrolls into view — works on every page,
  // including cards that appear later (filters, route changes).
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("avn-in-view")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1 }
    )
    const scan = () =>
      document.querySelectorAll(".avn-scroll-reveal:not(.avn-in-view)").forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.getElementById("root"), { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div className="avn-app-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
