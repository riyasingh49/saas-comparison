import { useMemo, useState } from 'react'
import { Calculator } from 'lucide-react'
import { formatPrice } from '../comparison/comparison-section/formatPrice'
import pricingBillingOptions from '../../data/pricing-billing-options.json'
import {
  calculateSoftwareCost,
  getVerifiedPricingPlans,
} from '../../utils/pricing'

function SoftwareCostCalculator({
  vendors = [],
  region = 'US',
}) {
  const availableVendors = useMemo(
    () =>
      vendors
        .filter(
          (vendor) =>
            getVerifiedPricingPlans(
              vendor,
              pricingBillingOptions
            ).length > 0
        ),
    [vendors]
  )

  const [vendorId, setVendorId] = useState('')
  const [planName, setPlanName] = useState('')
  const [seats, setSeats] = useState('5')
  const [billing, setBilling] = useState('annual')

  const vendor =
    availableVendors.find(
      (item) => item.id === vendorId
    ) || availableVendors[0]

  const plans = vendor
    ? getVerifiedPricingPlans(
        vendor,
        pricingBillingOptions
      )
    : []

  const plan =
    plans.find((item) => item.name === planName) ||
    plans[0]

  const monthlyAvailable =
    plan?.rates.monthly !== null &&
    plan?.rates.monthly !== undefined

  const annualAvailable =
    plan?.rates.annual !== null &&
    plan?.rates.annual !== undefined

  const selectedBilling =
    billing === 'monthly' && !monthlyAvailable
      ? 'annual'
      : billing === 'annual' && !annualAvailable
        ? 'monthly'
        : billing

  const totals = plan
    ? calculateSoftwareCost({
        monthlyRate: plan.rates.monthly,
        annualRate: plan.rates.annual,
        seats,
      })
    : null

  const selectedTotal =
    selectedBilling === 'annual'
      ? totals?.annualTotal
      : totals?.monthlyTotal

  const currency = vendor?.pricing?.currency

  const isUsdInIndia =
    region === 'IN' && currency === 'USD'

  const handleVendorChange = (event) => {
    setVendorId(event.target.value)
    setPlanName('')
    setBilling('annual')
  }

  const handleSeatsChange = (event) => {
    const value = event.target.value

    if (value === '') {
      setSeats('')
      return
    }

    const numericValue = Number(value)

    if (!Number.isFinite(numericValue)) return

    setSeats(
      String(
        Math.min(10000, Math.max(1, Math.floor(numericValue)))
      )
    )
  }

  if (!availableVendors.length) {
    return null
  }

  return (
    <section
      className="container mx-auto px-4 py-6"
      aria-labelledby="cost-calculator-heading"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Calculator size={19} aria-hidden="true" />
          </span>

          <div>
            <h2
              id="cost-calculator-heading"
              className="text-lg font-semibold text-gray-900"
            >
              Estimate your software cost
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Compare published billing rates for your team.
              Taxes, add-ons and usage charges are excluded.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-medium text-gray-700">
            Software

            <select
              value={vendor?.id || ''}
              onChange={handleVendorChange}
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm"
            >
              {availableVendors.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
            Plan

            <select
              value={plan?.name || ''}
              onChange={(event) =>
                setPlanName(event.target.value)
              }
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm"
            >
              {plans.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-700">
            Seats

            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              value={seats}
              onChange={handleSeatsChange}
              onBlur={() => {
                if (!seats || Number(seats) < 1) {
                  setSeats('1')
                }
              }}
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
            />
          </label>

          <fieldset className="text-sm font-medium text-gray-700">
            <legend>Billing frequency</legend>

            <div className="mt-2 flex rounded-xl border border-gray-200 p-1">
              <button
                type="button"
                disabled={!annualAvailable}
                onClick={() => setBilling('annual')}
                aria-pressed={selectedBilling === 'annual'}
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40 ${
                  selectedBilling === 'annual'
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-600'
                }`}
              >
                Annual
              </button>

              <button
                type="button"
                disabled={!monthlyAvailable}
                onClick={() => setBilling('monthly')}
                aria-pressed={selectedBilling === 'monthly'}
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40 ${
                  selectedBilling === 'monthly'
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
            </div>
          </fieldset>
        </div>

        {plan && totals && (
          <div className="mt-5 rounded-xl bg-slate-900 p-4 text-white">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-300">
              {selectedBilling === 'annual'
                ? 'Total billed annually'
                : 'Total billed monthly'}
            </p>

            {selectedTotal !== null ? (
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {formatPrice(selectedTotal, currency)}
              </p>
            ) : (
              <p className="mt-1 text-lg font-semibold">
                This billing option is not listed.
              </p>
            )}

            <p className="mt-2 text-xs leading-5 text-slate-300">
              {plan.name} plan · {totals.seats} seats ·{' '}
              {formatPrice(
                selectedBilling === 'annual'
                  ? plan.rates.annual
                  : plan.rates.monthly,
                currency
              )}{' '}
              per seat/month equivalent
            </p>

            <div className="mt-4 grid gap-3 border-t border-slate-700 pt-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-300">
                  Monthly billing total
                </p>
                <p className="mt-1 text-base font-semibold">
                  {totals.monthlyTotal === null
                    ? 'Not listed'
                    : formatPrice(totals.monthlyTotal, currency)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-300">
                  Annual billing total
                </p>
                <p className="mt-1 text-base font-semibold">
                  {totals.annualTotal === null
                    ? 'Not listed'
                    : formatPrice(totals.annualTotal, currency)}
                </p>
              </div>
            </div>

            {totals.annualSavings !== null &&
              totals.annualSavings > 0 && (
                <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-sm">
                  Annual billing saves{' '}
                  <strong>
                    {formatPrice(
                      totals.annualSavings,
                      currency
                    )}
                  </strong>{' '}
                  per year compared with monthly billing.
                </p>
              )}
          </div>
        )}

        {isUsdInIndia && (
          <p className="mt-3 text-xs text-gray-600">
            This vendor’s listed pricing is in USD. The
            calculator does not convert it to INR.
          </p>
        )}

        <p className="mt-3 text-xs leading-5 text-gray-500">
          Estimate based on published vendor pricing. Actual
          checkout totals may vary by location, taxes, plan
          conditions and billing terms.
        </p>
      </div>
    </section>
  )
}

export default SoftwareCostCalculator
