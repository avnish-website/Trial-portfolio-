import * as React from "react"

// ==========================================================
// Placeholder wordmark logo.
// You said you have a real AVNEDIT logo file (dark navy / blue /
// cyan). Replace this component's contents with an <img src="/logo.svg" />
// once you export the logo as SVG/PNG into /public. Keeping it as
// a component means every place that uses <Logo /> updates at once.
// ==========================================================

export default function Logo({ size = "md" }) {
  const dims = size === "sm" ? 28 : size === "lg" ? 44 : 34
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--avn-font-display)",
        fontWeight: 700,
        fontSize: dims * 0.5,
        color: "var(--avn-white)",
        letterSpacing: "-0.01em",
      }}
    >
      <svg width={dims} height={dims} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="avnLogoGrad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#168CFF" />
            <stop offset="100%" stopColor="#35D9FF" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="#0B1630" stroke="url(#avnLogoGrad)" strokeWidth="1.5" />
        <path
          d="M20 10 L28 30 L23.5 30 L20 21 L16.5 30 L12 30 Z"
          fill="url(#avnLogoGrad)"
        />
      </svg>
      AVNEDIT
    </span>
  )
}
