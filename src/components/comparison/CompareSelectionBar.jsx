
import { ArrowRight, Check, X } from 'lucide-react'

function CompareSelectionBar({
  selectedVendors = [],
  onOpenComparison,
  onClearSelection,
  maxSelection = 4,
}) {
  const validVendors = Array.isArray(selectedVendors)
    ? selectedVendors.filter((vendor) => vendor?.id && vendor?.name)
    : []

  if (validVendors.length === 0) {
    return null
  }

  const canCompare = validVendors.length >= 2

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <Check size={18} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {validVendors.length} of {maxSelection} selected
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {validVendors.map((vendor) => (
                <span
                  key={vendor.id}
                  className="max-w-36 truncate rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                  title={vendor.name}
                >
                  {vendor.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onClearSelection}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          >
            <X size={16} aria-hidden="true" />
            Clear
          </button>

          <button
            type="button"
            onClick={onOpenComparison}
            disabled={!canCompare}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300"
          >
            Compare
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompareSelectionBar
