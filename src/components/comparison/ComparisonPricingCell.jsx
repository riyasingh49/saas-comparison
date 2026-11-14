import { ExternalLink } from 'lucide-react'
import {
  getComparablePlans,
  getContractDetails,
  getFreePlanDetails,
  getPlanSeatCosts,
  getVerifiedPricingSources,
} from '../../utils/comparisonPricing'
import formatComparisonCurrency from '../../utils/formatComparisonCurrency'

function ComparisonPricingCell({ vendor, seats, lowestPrices }) {
  const plans = getComparablePlans(vendor)
  const freePlan = getFreePlanDetails(vendor)
  const sources = getVerifiedPricingSources(vendor)
  const currency = vendor.pricing?.currency

  if (!plans.length) {
    return (
      <div className="space-y-1.5">
        <p className="text-xs text-gray-500">
          Verified paid pricing is not available.
        </p>

        {freePlan.available === true && (
          <p className="text-xs font-medium text-gray-700">
            Free plan available
            {freePlan.limit ? ` · ${freePlan.limit}` : ''}
          </p>
        )}

        {freePlan.available === false && (
          <p className="text-xs text-gray-500">
            No free plan listed
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {plans.map((plan) => {
        const costs = getPlanSeatCosts(plan, seats)
        const lowest = lowestPrices.get(currency)

        const isLowest =
          lowest?.vendorId === vendor.id &&
          lowest?.planName === plan.name

        const contract = getContractDetails(plan)

        return (
          <div
            key={`${vendor.id}-${plan.name}`}
            className="rounded-lg border border-gray-200 p-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-1">
              <h4 className="text-xs font-semibold text-gray-900">
                {plan.name}
              </h4>

              {isLowest && (
                <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-medium text-white">
                  Lowest annual price
                </span>
              )}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-md bg-gray-50 p-1.5">
                <p className="text-[10px] text-gray-500">
                  Monthly / user
                </p>
                <p className="mt-0.5 text-xs font-semibold tabular-nums text-gray-900">
                  {formatComparisonCurrency(plan.rates.monthly, currency)}
                </p>
              </div>

              <div className="rounded-md bg-gray-50 p-1.5">
                <p className="text-[10px] text-gray-500">
                  Annual / user
                </p>
                <p className="mt-0.5 text-xs font-semibold tabular-nums text-gray-900">
                  {formatComparisonCurrency(plan.rates.annual, currency)}
                </p>
              </div>
            </div>

            <div className="mt-2 border-t border-gray-100 pt-2">
              <p className="text-[10px] font-medium text-gray-500">
                Estimated cost for {costs.seats}{' '}
                {costs.seats === 1 ? 'seat' : 'seats'}
              </p>

              <div className="mt-1 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-gray-500">
                    Monthly total
                  </p>
                  <p className="text-xs font-semibold tabular-nums text-gray-900">
                    {formatComparisonCurrency(costs.monthlyTotal, currency)}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Annual total
                  </p>
                  <p className="text-xs font-semibold tabular-nums text-gray-900">
                    {formatComparisonCurrency(costs.annualTotal, currency)}
                  </p>
                </div>
              </div>

              {costs.annualSavings !== null && costs.annualSavings > 0 && (
                <p className="mt-1 text-[10px] text-gray-600">
                  Saves{' '}
                  {formatComparisonCurrency(costs.annualSavings, currency)}{' '}
                  yearly.
                </p>
              )}
            </div>

            <div className="mt-2 border-t border-gray-100 pt-1.5">
              <p className="text-[10px] text-gray-500">
                Contract:{' '}
                <span className="text-gray-700">
                  {contract || 'Not listed'}
                </span>
              </p>
            </div>

            {plan.note && (
              <p className="mt-1 text-[10px] leading-4 text-gray-500">
                {plan.note}
              </p>
            )}
          </div>
        )
      })}

      <div className="rounded-lg bg-gray-50 p-2">
        <p className="text-[10px] font-medium text-gray-600">
          Free plan
        </p>

        <p className="mt-0.5 text-xs text-gray-700">
          {freePlan.available === true
            ? `Available${freePlan.limit ? ` · ${freePlan.limit}` : ''}`
            : freePlan.available === false
              ? 'Not available'
              : 'Not verified'}
        </p>

        {freePlan.note && (
          <p className="mt-1 text-[10px] leading-4 text-gray-500">
            {freePlan.note}
          </p>
        )}
      </div>

      {sources.length > 0 && (
        <div className="border-t border-gray-100 pt-2">
          <p className="mb-1 text-[10px] font-medium text-gray-600">
            Official pricing sources
          </p>

          <div className="space-y-1">
            {sources.map((source, index) => (
              <div key={`${source.url}-${index}`}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-700 underline underline-offset-2 hover:text-black"
                >
                  {source.label || 'Official pricing source'}
                  <ExternalLink size={10} />
                </a>

                <p className="text-[10px] text-gray-500">
                  Checked {source.checkedAt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ComparisonPricingCell
