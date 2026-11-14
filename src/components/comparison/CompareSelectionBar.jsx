import { ArrowRight, X, Scale } from 'lucide-react'

function CompareSelectionBar({
  selectedVendors = [],
  onOpenComparison,
  onClearSelection,
  maxSelection = 4,
}) {
  const validVendors = selectedVendors.filter(
    (vendor) => vendor && vendor.id && vendor.name
  )

  if (validVendors.length === 0) {
    return null
  }

  const selectionLimit = Math.max(1, maxSelection)
  const hasReachedLimit = validVendors.length >= selectionLimit

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md"
      role="region"
      aria-label="Selected software for comparison"
    >
      <div className="container mx-auto flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Scale size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              {validVendors.length} of {selectionLimit} selected
            </p>

            <div className="mt-1 flex flex-wrap gap-1.5">
              {validVendors.map((vendor) => (
                <span
                  key={vendor.id}
                  className="max-w-36 truncate rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                  title={vendor.name}
                >
                  {vendor.name}
                </span>
              ))}
            </div>

            {hasReachedLimit && (
              <p className="mt-1 text-xs text-slate-500">
                Remove a tool before adding another.
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {onClearSelection && (
            <button
              type="button"
              onClick={onClearSelection}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Clear
            </button>
          )}

          <button
            type="button"
            onClick={onOpenComparison}
            disabled={validVendors.length < 2}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300 sm:flex-none"
          >
            Compare now
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompareSelectionBar
