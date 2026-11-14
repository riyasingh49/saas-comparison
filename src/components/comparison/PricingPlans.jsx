import { Check, Clock3, Info } from 'lucide-react'
import {
  formatPrice,
  formatBillingPeriod,
} from './comparison-section/formatPrice'

function PricingPlans({ vendor }) {
  const pricing = vendor?.pricing

  if (!pricing || pricing.status === 'unverified') {
    return (
      <p className="text-sm text-gray-500">
        Pricing information is awaiting verification.
      </p>
    )
  }

  const plans = Array.isArray(pricing.plans) ? pricing.plans : []

  if (plans.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No pricing plans listed.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {pricing.status !== 'verified' && (
        <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-2 text-xs text-gray-600">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>Pricing details still need verification.</span>
        </div>
      )}

      <div className="grid gap-3">
        {plans.map((plan, index) => {
          if (!plan || typeof plan !== 'object') return null

          const planName = plan.name || `Plan ${index + 1}`
          const price = formatPrice(plan.price, pricing.currency)
          const billingPeriod = formatBillingPeriod(plan.billingPeriod)

          return (
            <div
              key={`${vendor.id}-${planName}-${index}`}
              className="rounded-xl border border-gray-200 bg-white p-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className="font-semibold text-gray-900">
                  {planName}
                </h4>

                <span className="text-sm font-semibold text-gray-900">
                  {price}
                </span>
              </div>

              {billingPeriod && (
                <p className="mt-1 text-xs text-gray-500">
                  {billingPeriod}
                </p>
              )}

              {plan.note && (
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  {plan.note}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {pricing.trialDays > 0 && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock3 size={14} />
          <span>{pricing.trialDays}-day free trial</span>
        </div>
      )}

      {pricing.freePlan && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Check size={14} />
          <span>Free plan available</span>
        </div>
      )}

      {pricing.freePlanNote && (
        <p className="text-xs text-gray-500">
          {pricing.freePlanNote}
        </p>
      )}
    </div>
  )
}

export default PricingPlans
