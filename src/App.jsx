import * as React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Services from "./pages/Services.jsx"
import Projects from "./pages/Projects.jsx"
import Plans from "./pages/Plans.jsx"
import Contact from "./pages/Contact.jsx"
import ProjectBriefWizard from "./pages/ProjectBrief/ProjectBriefWizard.jsx"
import OrderConfirmation from "./pages/OrderConfirmation.jsx"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project-brief" element={<ProjectBriefWizard />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Route>
    </Routes>
  )
}
