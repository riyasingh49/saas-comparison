import { Check, Clock3, Info } from 'lucide-react'
import {
  formatPrice,
  formatBillingPeriod,
} from './comparison-section/formatPrice'

const BILLING_MODEL_NOTES = {
  per_organization:
    'This subscription is priced per organisation, not per user. It is not used in per-seat cost comparisons.',
  base_plus_per_employee:
    'This plan combines a base fee with employee charges. The displayed base price is not the complete team cost.',
  license_based:
    'This is a licence-based product. The licence price is not treated as a per-user monthly subscription.',
  per_organizer:
    'This product is priced per meeting organiser. It is not treated as a per-attendee price.',
  custom_quote:
    'The vendor requires a custom quote. No numeric price has been assumed.',
}

function PricingPlans({ vendor }) {
  const pricing = vendor?.pricing

  if (!pricing || pricing.status === 'unverified') {
    return (
      <p className="text-sm text-gray-500">
        {pricing?.pricingNote ||
          'Pricing information is awaiting verification.'}
      </p>
    )
  }

  const plans = Array.isArray(pricing.plans)
    ? pricing.plans.filter(
        (plan) => plan && typeof plan === 'object'
      )
    : []

  if (plans.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No numeric pricing plans are currently listed.
      </p>
    )
  }

  const trialDays = pricing.freeTrialDays || pricing.trialDays
  const hasFreeTrial =
    pricing.freeTrial === true || Number(trialDays) > 0

  const billingNote =
    BILLING_MODEL_NOTES[pricing.billingModel]

  return (
    <div className="min-w-0">
      {billingNote && (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>{billingNote}</span>
        </div>
      )}

      {pricing.status !== 'verified' && !billingNote && (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>
            Some pricing details still need verification.
          </span>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {plans.map((plan, index) => {
          const planName = plan.name || `Plan ${index + 1}`
          const price =
            plan.price === null || plan.price === undefined
              ? 'Custom quote'
              : formatPrice(plan.price, pricing.currency)

          const billingPeriod = formatBillingPeriod(
            plan.billingPeriod
          )

          return (
            <div
              key={`${vendor.id}-${planName}-${index}`}
              className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-sm font-medium text-gray-800">
                  {planName}
                </span>

                <span className="text-sm font-semibold tabular-nums text-gray-900">
                  {price}
                </span>
              </div>

              {(billingPeriod || plan.unit) && (
                <p className="text-xs text-gray-500">
                  {[billingPeriod, plan.unit]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}

              {plan.note && (
                <p className="text-xs leading-5 text-gray-500">
                  {plan.note}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {(hasFreeTrial || pricing.freePlan === true) && (
        <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
          {hasFreeTrial && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock3 size={14} className="shrink-0" />
              <span>
                {Number(trialDays) > 0
                  ? `${trialDays}-day free trial`
                  : 'Free trial available'}
              </span>
            </div>
          )}

          {pricing.freePlan === true && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Check size={14} className="shrink-0" />
              <span>Free plan available</span>
            </div>
          )}
        </div>
      )}

      {pricing.freePlanNote && (
        <p className="mt-2 text-xs leading-5 text-gray-500">
          {pricing.freePlanNote}
        </p>
      )}
    </div>
  )
}

export default PricingPlans
