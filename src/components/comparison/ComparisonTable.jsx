import { Check, X, ArrowLeft } from 'lucide-react'

function ComparisonTable({
  vendors = [],
  features = [],
  onRemoveVendor,
  onBack,
}) {
  const validVendors = vendors.filter(
    (vendor) => vendor && vendor.id && vendor.name
  )

  const validFeatures = features.filter(
    (feature) => feature && feature.id && feature.label
  )

  const getFeatureValue = (vendor, feature) => {
    const value = vendor.features?.[feature.id]

    if (value === undefined || value === null || value === '') {
      return 'Not available'
    }

    return value
  }

  const renderValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
          <Check size={16} aria-hidden="true" />
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-slate-500">
          <X size={16} aria-hidden="true" />
          No
        </span>
      )
    }

    return (
      <span className="text-sm leading-6 text-slate-700">
        {String(value)}
      </span>
    )
  }

  if (validVendors.length < 2) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="font-medium text-slate-800">
          Select at least two software tools to compare.
        </p>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Back to software
          </button>
        )}
      </div>
    )
  }

  return (
    <section
    aria-label="Software comparison"
    className="space-y-5"
  >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Side-by-side comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review the available features for each selected tool.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to results
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-slate-50">
              <th
                scope="col"
                className="sticky left-0 z-10 min-w-40 border-b border-r border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700"
              >
                Features
              </th>

              {validVendors.map((vendor) => (
                <th
                  key={vendor.id}
                  scope="col"
                  className="min-w-48 border-b border-slate-200 p-4 align-top"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {vendor.name}
                    </span>

                    {onRemoveVendor && (
                      <button
                        type="button"
                        onClick={() => onRemoveVendor(vendor.id)}
                        aria-label={`Remove ${vendor.name} from comparison`}
                        className="rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline"
                    >
                      Visit website
                    </a>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {validFeatures.length > 0 ? (
              validFeatures.map((feature) => (
                <tr
                  key={feature.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-r border-slate-100 bg-white p-4 text-sm font-medium text-slate-700"
                  >
                    {feature.label}
                  </th>

                  {validVendors.map((vendor) => (
                    <td
                      key={vendor.id}
                      className="p-4 align-top"
                    >
                      {renderValue(getFeatureValue(vendor, feature))}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={validVendors.length + 1}
                  className="p-8 text-center text-sm text-slate-500"
                >
                  No comparison features are available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ComparisonTable
