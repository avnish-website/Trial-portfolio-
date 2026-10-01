import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useOrder } from "../../context/OrderContext.jsx"
import { getPlanById, formatPrice } from "../../data/plans.js"
import { FIELD_SCHEMAS, emptyEntryFor } from "../../data/serviceFieldSchemas.js"
import { isValidEmail, isValidUrl, isValidCustomerCode } from "../../utils/validators.js"
import { generateOrderId } from "../../utils/generateOrderId.js"
import { submitOrder } from "../../utils/api.js"

import CustomerDetailsStep from "./steps/CustomerDetailsStep.jsx"
import ProjectDetailsStep from "./steps/ProjectDetailsStep.jsx"
import FilesReferencesStep from "./steps/FilesReferencesStep.jsx"
import CustomerCodeStep from "./steps/CustomerCodeStep.jsx"
import OrderSummaryStep from "./steps/OrderSummaryStep.jsx"

import "./ProjectBriefWizard.css"

const STEP_LABELS = ["Your Details", "Project Details", "Files & References", "Customer Code", "Summary"]

export default function ProjectBriefWizard() {
  const navigate = useNavigate()
  const { order, updateOrder } = useOrder()
  const plan = getPlanById(order.selectedPlanId)

  const [step, setStep] = React.useState(1)
  const [errors, setErrors] = React.useState({})
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState("")

  // No plan chosen (e.g. someone opened this URL directly) — send them
  // back to Plans rather than showing a broken/empty wizard.
  React.useEffect(() => {
    if (!plan) navigate("/plans", { replace: true })
  }, [plan, navigate])

  // Make sure serviceEntries has the right number of empty entries for
  // the selected plan the first time the wizard mounts for this plan.
  React.useEffect(() => {
    if (!plan) return
    const needsInit = plan.services.some(
      (s) => !order.serviceEntries[s.type] || order.serviceEntries[s.type].length !== s.count
    )
    if (needsInit) {
      const nextEntries = { ...order.serviceEntries }
      plan.services.forEach((s) => {
        if (!nextEntries[s.type] || nextEntries[s.type].length !== s.count) {
          nextEntries[s.type] = Array.from({ length: s.count }, () => emptyEntryFor(s.type))
        }
      })
      updateOrder({ serviceEntries: nextEntries })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan?.id])

  if (!plan) return null

  function handleFieldChange(type, index, fieldName, value) {
    const nextEntries = { ...order.serviceEntries }
    const list = [...(nextEntries[type] || [])]
    list[index] = { ...list[index], [fieldName]: value }
    nextEntries[type] = list
    updateOrder({ serviceEntries: nextEntries })
  }

  function validateStep(current) {
    const nextErrors = {}

    if (current === 1) {
      if (!order.customer.name.trim()) nextErrors.name = "Name is required."
      if (!isValidEmail(order.customer.email)) nextErrors.email = "Enter a valid email address."
    }

    if (current === 2) {
      const serviceErrors = {}
      plan.services.forEach((service) => {
        const schema = FIELD_SCHEMAS[service.type] || []
        const entries = order.serviceEntries[service.type] || []
        const entryErrorsList = entries.map((entry) => {
          const entryErrors = {}
          schema.forEach((field) => {
            if (!field.required) return
            const value = entry[field.name] || ""
            if (field.type === "url") {
              if (!isValidUrl(value)) entryErrors[field.name] = "Enter a valid link (starting with https://)."
            } else if (!value.trim()) {
              entryErrors[field.name] = "This field is required."
            }
          })
          return entryErrors
        })
        if (entryErrorsList.some((e) => Object.keys(e).length > 0)) {
          serviceErrors[service.type] = entryErrorsList
        }
      })
      if (Object.keys(serviceErrors).length > 0) nextErrors.serviceErrors = serviceErrors
    }

    if (current === 4) {
      if (!isValidCustomerCode(order.customerCode)) {
        nextErrors.customerCode = "Use letters and numbers only, no spaces (4-20 characters)."
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function goNext() {
    if (!validateStep(step)) return
    setStep((s) => Math.min(s + 1, 5))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function goBack() {
    if (step === 1) {
      navigate("/plans")
      return
    }
    setStep((s) => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function handleSubmit() {
    setSubmitError("")
    setSubmitting(true)

    const payload = {
      selectedPlan: {
        id: plan.id,
        category: plan.category,
        name: plan.name,
        price: plan.price,
        revisionCount: plan.revisionCount,
      },
      customer: order.customer,
      serviceEntries: order.serviceEntries,
      otherRequest: order.otherRequest,
      filesNote: order.filesNote,
      customerCode: order.customerCode,
      submittedAt: new Date().toISOString(),
    }

    try {
      const result = await submitOrder(payload)
      updateOrder({
        lastConfirmation: {
          orderId: result?.orderId || generateOrderId(),
          customerCode: order.customerCode,
          planName: plan.name,
        },
      })
      navigate("/order-confirmation")
    } catch (err) {
      setSubmitError(err.message || "Something went wrong while submitting your request. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="avn-page avn-container">
      <div className="avn-wizard-header">
        <h1>Project Brief</h1>
        <span className="avn-wizard-plan-chip">
          {plan.name} — {formatPrice(plan.price)}
        </span>
      </div>

      <div className="avn-wizard-progress" aria-hidden="true">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={
              i + 1 < step
                ? "avn-wizard-progress-step avn-step-done"
                : i + 1 === step
                ? "avn-wizard-progress-step avn-step-current"
                : "avn-wizard-progress-step"
            }
          />
        ))}
      </div>

      <div className="avn-wizard-body">
        {step === 1 && (
          <CustomerDetailsStep customer={order.customer} errors={errors} onChange={(customer) => updateOrder({ customer })} />
        )}

        {step === 2 && (
          <ProjectDetailsStep
            plan={plan}
            serviceEntries={order.serviceEntries}
            errors={errors.serviceErrors}
            onFieldChange={handleFieldChange}
            otherRequest={order.otherRequest}
            onOtherRequestChange={(val) => updateOrder({ otherRequest: val })}
          />
        )}

        {step === 3 && <FilesReferencesStep filesNote={order.filesNote} onChange={(val) => updateOrder({ filesNote: val })} />}

        {step === 4 && (
          <CustomerCodeStep
            customerCode={order.customerCode}
            error={errors.customerCode}
            onChange={(val) => updateOrder({ customerCode: val })}
          />
        )}

        {step === 5 && (
          <OrderSummaryStep
            plan={plan}
            order={order}
            submitting={submitting}
            submitError={submitError}
            onSubmit={handleSubmit}
          />
        )}

        {step < 5 && (
          <div className="avn-wizard-nav">
            <button type="button" className="avn-btn avn-btn-ghost" onClick={goBack}>
              Back
            </button>
            <button type="button" className="avn-btn avn-btn-primary" onClick={goNext}>
              Continue
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="avn-wizard-nav">
            <button type="button" className="avn-btn avn-btn-ghost" onClick={goBack} disabled={submitting}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
