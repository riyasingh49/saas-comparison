import { ArrowRight, Check, X } from 'lucide-react'

function CompareSelectionPanel({
  selectedVendors = [],
  maxSelection = 4,
  showComparison = false,
  onRemoveVendor,
  onClearSelection,
  onOpenComparison,
  onCloseComparison,
}) {
  const validVendors = Array.isArray(selectedVendors)
    ? selectedVendors.filter((vendor) => vendor?.id && vendor?.name)
    : []

  const canCompare = validVendors.length >= 2

  return (
    <aside
      aria-labelledby="compare-selection-title"
      className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3
            id="compare-selection-title"
            className="text-base font-semibold text-gray-900"
          >
            Compare software
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Select at least two tools to compare their pricing and features.
          </p>
        </div>

        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
          <Check size={17} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Selected tools
        </span>

        <span
          className="text-xs font-semibold tabular-nums text-gray-700"
          aria-live="polite"
        >
          {validVendors.length} / {maxSelection}
        </span>
      </div>

      {validVendors.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {validVendors.map((vendor) => (
            <li
              key={vendor.id}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5"
            >
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-semibold text-gray-700"
              >
                {vendor.name.charAt(0).toUpperCase()}
              </span>

              <span
                className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800"
                title={vendor.name}
              >
                {vendor.name}
              </span>

              <button
                type="button"
                onClick={() => onRemoveVendor?.(vendor.id)}
                aria-label={`Remove ${vendor.name} from comparison`}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-gray-300 px-4 py-6 text-center">
          <p className="text-sm font-medium text-gray-700">
            No tools selected yet
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Use the Add to compare button on any vendor card to get started.
          </p>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={
            showComparison ? onCloseComparison : onOpenComparison
          }
          disabled={!showComparison && !canCompare}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200"
        >
          {showComparison ? 'Hide comparison' : 'Compare selected tools'}
          <ArrowRight size={16} aria-hidden="true" />
        </button>

        {validVendors.length > 0 && (
          <button
            type="button"
            onClick={onClearSelection}
            className="w-full rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          >
            Clear selection
          </button>
        )}
      </div>

      {!canCompare && validVendors.length > 0 && (
        <p className="mt-3 text-center text-xs leading-5 text-gray-500">
          Add one more tool to enable the comparison.
        </p>
      )}

      {validVendors.length >= maxSelection && (
        <p className="mt-3 text-center text-xs leading-5 text-gray-500">
          You've reached the limit of {maxSelection} tools per comparison.
        </p>
      )}
    </aside>
  )
}

export default CompareSelectionPanel