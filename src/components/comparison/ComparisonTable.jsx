import { useMemo, useState } from 'react'
import { ArrowLeft, Info, X } from 'lucide-react'
import {
  getLowestAnnualPrices,
} from '../../utils/comparisonPricing'
import ComparisonPricingCell from './ComparisonPricingCell'
import ComparisonFeatureValue from './ComparisonFeatureValue'

function ComparisonTable({
  vendors = [],
  features = [],
  onRemoveVendor,
  onBack,
}) {
  const [seats, setSeats] = useState(5)

  const validVendors = useMemo(
    () =>
      Array.isArray(vendors)
        ? vendors.filter((vendor) => vendor?.id && vendor?.name)
        : [],
    [vendors]
  )

  const validFeatures = useMemo(
    () =>
      Array.isArray(features)
        ? features.filter(
            (feature) =>
              feature?.id &&
              feature?.label &&
              !['pricing', 'freePlan'].includes(feature.id)
          )
        : [],
    [features]
  )

  const lowestPrices = useMemo(
    () => getLowestAnnualPrices(validVendors),
    [validVendors]
  )

  const handleSeatChange = (event) => {
    const value = Number(event.target.value)

    if (!Number.isFinite(value)) {
      setSeats(1)
      return
    }

    setSeats(Math.min(10000, Math.max(1, Math.floor(value))))
  }

  if (validVendors.length < 2) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 text-center">
        <p className="text-xs font-semibold text-gray-800">
          Select at least two vendors to compare.
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Your selected software will appear here.
        </p>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-3 text-xs font-medium text-gray-700 underline underline-offset-4 hover:text-black"
          >
            Back to vendors
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-3 py-2.5">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Side-by-side comparison
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            Compare verified prices, team costs and product features.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft size={13} />
            Back
          </button>
        )}
      </div>

      <div className="border-b border-gray-200 bg-gray-50 px-3 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <label
              htmlFor="comparison-seats"
              className="text-xs font-semibold text-gray-800"
            >
              Team size
            </label>

            <p className="mt-0.5 text-[10px] text-gray-500">
              Update seats to recalculate team costs.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              id="comparison-seats"
              type="number"
              min="1"
              max="10000"
              step="1"
              value={seats}
              onChange={handleSeatChange}
              className="w-16 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs tabular-nums text-gray-900 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
            />

            <span className="text-xs text-gray-600">seats</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-32 sm:w-36" />
            {validVendors.map((vendor) => (
              <col key={vendor.id} />
            ))}
          </colgroup>

          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="sticky left-0 z-20 border-r border-gray-200 bg-gray-50 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                Comparison
              </th>

              {validVendors.map((vendor) => (
                <th
                  key={vendor.id}
                  className="border-r border-gray-200 px-2 py-2 last:border-r-0"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="truncate text-xs font-semibold text-gray-900"
                      title={vendor.name}
                    >
                      {vendor.name}
                    </span>

                    {onRemoveVendor && (
                      <button
                        type="button"
                        onClick={() => onRemoveVendor(vendor.id)}
                        aria-label={`Remove ${vendor.name} from comparison`}
                        title={`Remove ${vendor.name}`}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-200 align-top">
              <th className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 px-2 py-2 text-xs font-semibold text-gray-800">
                Pricing and team costs
              </th>

              {validVendors.map((vendor) => (
                <td
                  key={vendor.id}
                  className="border-r border-gray-200 px-2 py-2 align-top last:border-r-0"
                >
                  <ComparisonPricingCell
                    vendor={vendor}
                    seats={seats}
                    lowestPrices={lowestPrices}
                  />
                </td>
              ))}
            </tr>

            {validFeatures.length > 0 ? (
              validFeatures.map((feature, index) => (
                <tr
                  key={feature.id}
                  className={`border-b border-gray-100 last:border-b-0 ${
                    index % 2 === 1 ? 'bg-gray-50/60' : 'bg-white'
                  }`}
                >
                  <th className="sticky left-0 z-10 border-r border-gray-200 bg-inherit px-2 py-2 text-xs font-medium text-gray-700">
                    {feature.label}
                  </th>

                  {validVendors.map((vendor) => (
                    <td
                      key={vendor.id}
                      className="border-r border-gray-200 px-2 py-2 align-middle last:border-r-0"
                    >
                      <ComparisonFeatureValue
                        value={vendor.features?.[feature.id]}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={validVendors.length + 1}
                  className="px-3 py-5 text-center text-xs text-gray-500"
                >
                  No additional comparison features are available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-1.5 border-t border-gray-200 bg-gray-50 px-3 py-2">
        <Info size={13} className="mt-0.5 shrink-0 text-gray-500" />

        <p className="text-[10px] leading-4 text-gray-500">
          Team costs are estimates based on published per-user rates and the
          selected seat count. Annual totals use the published annual
          monthly-equivalent rate multiplied by 12. Taxes, add-ons,
          onboarding and usage charges may be extra. Prices are not
          comparable across different currencies.
        </p>
      </div>
    </div>
  )
}

export default ComparisonTable
