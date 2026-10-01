import * as React from "react"

export default function FilesReferencesStep({ filesNote, onChange }) {
  return (
    <div>
      <h2 className="avn-wizard-step-title">Files &amp; References</h2>
      <p className="avn-wizard-step-desc">
        You've already added specific Drive links for each deliverable in the previous step. Use this space
        for anything extra — additional references, brand assets, or general notes about your files.
      </p>

      <div className="avn-unlimited-note" style={{ marginBottom: 18 }}>
        Upload your media to Google Drive and paste the shareable link here or in the relevant field above.
        Make sure the link permissions allow AVNEDIT to access the files.
      </div>

      <textarea
        rows={5}
        placeholder="Any additional files, references or notes (optional)"
        value={filesNote}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "var(--avn-bg-elevated)",
          border: "1px solid var(--avn-border)",
          borderRadius: 10,
          padding: "12px 14px",
          color: "var(--avn-white)",
          fontFamily: "var(--avn-font-body)",
          fontSize: 14.5,
        }}
      />
    </div>
  )
}
