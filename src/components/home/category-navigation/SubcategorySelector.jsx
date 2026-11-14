function SubcategorySelector({
  categoryName = '',
  subTypes = [],
  activeSubType = '',
  onSelectSubType,
}) {
  const validSubTypes = Array.isArray(subTypes)
    ? [...new Set(
        subTypes.filter(
          (item) => typeof item === 'string' && item.trim()
        )
      )]
    : []

  if (!validSubTypes.length) {
    return null
  }

  return (
    <section
      className="mt-5 border-t border-slate-200 pt-5"
      aria-label={`${categoryName} subcategory filters`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">
          {categoryName} options
        </h3>

        <span className="text-xs text-slate-400">
          {validSubTypes.length} options
        </span>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={`Filter by ${categoryName} subcategory`}
      >
        <button
          type="button"
          onClick={() => onSelectSubType?.('')}
          aria-pressed={!activeSubType}
          className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${
            !activeSubType
              ? 'border-slate-800 bg-slate-800 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          All
        </button>

        {validSubTypes.map((subType) => {
          const isActive = activeSubType === subType

          return (
            <button
              key={subType}
              type="button"
              onClick={() => onSelectSubType?.(
                isActive ? '' : subType
              )}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-slate-800 bg-slate-800 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {subType}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default SubcategorySelector
