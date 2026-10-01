import * as React from "react"
import FormField from "../../../components/FormField.jsx"

const CODE_FIELD = { name: "customerCode", label: "Your Customer Code", type: "text", required: true, placeholder: "e.g. BLUEWOLF27" }

export default function CustomerCodeStep({ customerCode, error, onChange }) {
  return (
    <div>
      <h2 className="avn-wizard-step-title">Customer Code</h2>
      <p className="avn-wizard-step-desc">
        Create your own order reference code. This is <strong>not a password</strong> — it just helps AVNEDIT
        match your Gmail conversation with your website order. Use this same code in the first Gmail message
        you send to AVNEDIT.
      </p>

      <FormField
        field={CODE_FIELD}
        value={customerCode}
        onChange={onChange}
        error={error}
      />

      <div className="avn-unlimited-note">
        Rules: letters and numbers only, no spaces. Please don't use a real password or sensitive personal
        information — this code is just a reference, not a login.
      </div>
    </div>
  )
}
