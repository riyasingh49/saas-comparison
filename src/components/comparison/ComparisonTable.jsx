import { ArrowLeft, Check, X } from 'lucide-react'
import PricingPlans from './PricingPlans'

function FeatureValue({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
        <Check size={16} className="shrink-0" />
        Yes
      </span>
    )
  }

  if (value === false) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-gray-500">
        <X size={16} className="shrink-0 text-gray-400" />
        No
      </span>
    )
  }

  if (value === null || value === undefined || value === '') {
    return <span className="text-sm text-gray-400">Not verified</span>
  }

  return (
    <span className="text-sm leading-5 text-gray-700">
      {String(value)}
    </span>
  )
}

function ComparisonTable({
  vendors = [],
  features = [],
  onRemoveVendor,
  onBack,
}) {
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
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center">
        <p className="text-sm font-semibold text-gray-800">
          Select at least two vendors to compare.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Your selected software will appear here.
        </p>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-black"
          >
            Back to vendors
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Side-by-side comparison
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Compare pricing and features across your selected tools.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to vendors
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-52" />
            {validVendors.map((vendor) => (
              <col key={vendor.id} />
            ))}
          </colgroup>

          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="sticky left-0 z-20 border-r border-gray-200 bg-gray-50 px-4 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Comparison
              </th>

              {validVendors.map((vendor) => (
                <th
                  key={vendor.id}
                  className="border-r border-gray-200 px-4 py-4 last:border-r-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="truncate text-sm font-semibold text-gray-900"
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
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-900"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-200 align-top">
              <th className="sticky left-0 z-10 border-r border-gray-200 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-800">
                Pricing plans
              </th>

              {validVendors.map((vendor) => (
                <td
                  key={vendor.id}
                  className="border-r border-gray-200 px-4 py-4 align-top last:border-r-0"
                >
                  <div className="h-72 overflow-y-auto pr-2">
                    <PricingPlans vendor={vendor} />
                  </div>
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
                  <th className="sticky left-0 z-10 border-r border-gray-200 bg-inherit px-4 py-4 text-sm font-medium text-gray-700">
                    {feature.label}
                  </th>

                  {validVendors.map((vendor) => (
                    <td
                      key={vendor.id}
                      className="border-r border-gray-200 px-4 py-4 align-middle last:border-r-0"
                    >
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
