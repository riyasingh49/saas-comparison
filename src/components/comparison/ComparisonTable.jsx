import { Check, X, Minus } from 'lucide-react'
import PricingPlans from './PricingPlans'

function FeatureValue({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-800">
        <Check size={16} />
        Yes
      </span>
    )
  }

  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
        <X size={16} />
        No
      </span>
    )
  }

  if (value === null || value === undefined || value === '') {
    return (
      <span className="text-sm text-gray-400">
        Not verified
      </span>
    )
  }

  return (
    <span className="text-sm text-gray-700">
      {String(value)}
    </span>
  )
}

function ComparisonTable({ vendors = [], features = [] }) {
  const validVendors = Array.isArray(vendors)
    ? vendors.filter((vendor) => vendor?.id && vendor?.name)
    : []

  const validFeatures = Array.isArray(features)
    ? features.filter(
        (feature) =>
          feature?.id &&
          feature?.label &&
          !['pricing', 'freePlan'].includes(feature.id)
      )
    : []

  if (validVendors.length < 2) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="font-medium text-gray-800">
          Select at least two vendors to compare.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Your selected software will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="sticky left-0 z-10 min-w-48 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700">
                Comparison
              </th>

              {validVendors.map((vendor) => (
                <th
                  key={vendor.id}
                  className="min-w-52 px-4 py-4 text-sm font-semibold text-gray-900"
                >
                  {vendor.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-200 align-top">
              <th className="sticky left-0 z-10 bg-white px-4 py-5 text-sm font-semibold text-gray-700">
                Pricing plans
              </th>

              {validVendors.map((vendor) => (
                <td key={vendor.id} className="px-4 py-5">
                  <PricingPlans vendor={vendor} />
                </td>
              ))}
            </tr>

            {validFeatures.length > 0 ? (
              validFeatures.map((feature) => (
                <tr
                  key={feature.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <th className="sticky left-0 z-10 bg-white px-4 py-4 text-sm font-medium text-gray-700">
                    {feature.label}
                  </th>

                  {validVendors.map((vendor) => (
                    <td key={vendor.id} className="px-4 py-4">
                      <FeatureValue value={vendor.features?.[feature.id]} />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={validVendors.length + 1}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No additional comparison features are available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ComparisonTable
