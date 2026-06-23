import Strings from "@/assets/strings.json"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

// Shows a confirmation after Stripe redirects the buyer back to the site.
// Configure the Payment Link's "after payment" redirect in Stripe to
// https://nectarhavenfeeders.com/?purchase=success for this to trigger.
const PurchaseBanner = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("purchase") !== "success") return

    setShow(true)
    // Strip the param so a refresh or shared URL doesn't re-trigger the banner.
    params.delete("purchase")
    const query = params.toString()
    const newUrl =
      window.location.pathname + (query ? `?${query}` : "") + window.location.hash
    window.history.replaceState({}, "", newUrl)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
        >
          <div className="flex w-full max-w-2xl items-start justify-between gap-4 rounded-organic bg-botanical-700 p-5 text-cream shadow-lift">
            <div>
              <p className="font-serif text-lg font-bold">{Strings.checkout.successTitle}</p>
              <p className="mt-1 text-sm text-cream/80">{Strings.checkout.successMessage}</p>
            </div>
            <button
              type="button"
              aria-label="Dismiss confirmation"
              onClick={() => setShow(false)}
            >
              <XMarkIcon className="h-6 w-6 transition hover:text-nectar-300" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PurchaseBanner
