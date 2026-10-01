import * as React from "react"
import FormField from "../../../components/FormField.jsx"

const NAME_FIELD = { name: "name", label: "Full Name", type: "text", required: true }
const EMAIL_FIELD = { name: "email", label: "Email", type: "text", required: true }

export default function CustomerDetailsStep({ customer, errors, onChange }) {
  return (
    <div>
      <h2 className="avn-wizard-step-title">Your Details</h2>
      <p className="avn-wizard-step-desc">Just the basics, so AVNEDIT knows who's sending this request.</p>

      <FormField
        field={NAME_FIELD}
        value={customer.name}
        onChange={(val) => onChange({ ...customer, name: val })}
        error={errors.name}
      />
      <FormField
        field={EMAIL_FIELD}
        value={customer.email}
        onChange={(val) => onChange({ ...customer, email: val })}
        error={errors.email}
      />
    </div>
  )
}
