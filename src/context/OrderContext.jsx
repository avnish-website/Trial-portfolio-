import * as React from "react"

// ==========================================================
// OrderContext — single place holding the customer's in-progress
// order as they move through Plans -> Confirmation Modal ->
// Project Brief wizard -> Order Confirmation.
//
// State is also mirrored into localStorage (key: "avnedit_order")
// so a customer doesn't lose their progress if they accidentally
// refresh or switch apps on mobile mid-form. This satisfies the
// "do not lose user's entered information" requirement.
// ==========================================================

const STORAGE_KEY = "avnedit_order"

const emptyOrder = {
  selectedPlanId: null,
  customer: { name: "", email: "" },
  serviceEntries: {
    video: [],
    reel: [],
    thumbnail: [],
    graphic: [],
    script: [],
    website: [],
  },
  otherRequest: "",
  filesNote: "",
  deadline: "",
  customerCode: "",
  lastConfirmation: null, // { orderId, customerCode, planName } after successful submit
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyOrder
    const parsed = JSON.parse(raw)
    return { ...emptyOrder, ...parsed }
  } catch {
    return emptyOrder
  }
}

const OrderContext = React.createContext(null)

export function OrderProvider({ children }) {
  const [order, setOrder] = React.useState(loadInitialState)

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
    } catch {
      // localStorage may be unavailable (private browsing etc.) — fail silently,
      // the in-memory state still works for the current session.
    }
  }, [order])

  const updateOrder = React.useCallback((patch) => {
    setOrder((prev) => ({ ...prev, ...patch }))
  }, [])

  const selectPlan = React.useCallback((planId) => {
    setOrder((prev) => ({ ...emptyOrder, selectedPlanId: planId }))
  }, [])

  const resetOrder = React.useCallback(() => {
    setOrder(emptyOrder)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const value = { order, updateOrder, selectPlan, resetOrder }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const ctx = React.useContext(OrderContext)
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>")
  return ctx
}
