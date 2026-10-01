import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useOrder } from "../context/OrderContext.jsx"
import "./OrderConfirmation.css"

const GMAIL_ADDRESS = "avnedit.yd@gmail.com"

export default function OrderConfirmation() {
  const { order, resetOrder } = useOrder()
  const navigate = useNavigate()
  const [copied, setCopied] = React.useState(false)
  const confirmation = order.lastConfirmation

  // If someone lands here without having just submitted an order,
  // send them back to Plans instead of showing empty confirmation data.
  React.useEffect(() => {
    if (!confirmation) navigate("/plans", { replace: true })
  }, [confirmation, navigate])

  if (!confirmation) return null

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(GMAIL_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  function handleStartNew() {
    resetOrder()
    navigate("/plans")
  }

  return (
    <div className="avn-page avn-container">
      <div className="avn-card avn-confirmation-card">
        <span className="avn-eyebrow" style={{ margin: "0 auto 16px" }}>
          REQUEST RECEIVED
        </span>

        <div className="avn-confirmation-rows">
          <div>
            <span>Order ID</span>
            <strong>{confirmation.orderId}</strong>
          </div>
          <div>
            <span>Customer Code</span>
            <strong>{confirmation.customerCode}</strong>
          </div>
          <div>
            <span>Selected Plan</span>
            <strong>{confirmation.planName}</strong>
          </div>
        </div>

        <p className="avn-confirmation-instruction">
          Please use your Customer Code in the first Gmail message you send to AVNEDIT.
        </p>

        <div className="avn-confirmation-email">
          <span>{GMAIL_ADDRESS}</span>
        </div>

        <div className="avn-confirmation-actions">
          <button type="button" className="avn-btn avn-btn-secondary" onClick={handleCopy}>
            {copied ? "Copied ✓" : "Copy Email"}
          </button>
          <a
            className="avn-btn avn-btn-primary"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
          >
            Open Gmail
          </a>
        </div>

        <button type="button" className="avn-confirmation-startnew" onClick={handleStartNew}>
          Start a New Order
        </button>
      </div>
    </div>
  )
}
