function SubcategorySelector({
  categoryName,
  subTypes = [],
  activeSubType = '',
  onSelectSubType,
}) {
  const validSubTypes = Array.isArray(subTypes)
    ? [...new Set(
        subTypes.filter(
          (subType) =>
            typeof subType === 'string' && subType.trim().length > 0
        )
      )]
    : []

  if (validSubTypes.length === 0) {
    return null
  }

  const handleSelect = (subType) => {
    onSelectSubType?.(activeSubType === subType ? '' : subType)
  }

  return (
    <section
      className="mt-5 border-t border-slate-200 pt-5"
      aria-label={`${categoryName} subcategory filters`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-800">
          {categoryName} options
        </h3>

        <span className="shrink-0 text-xs text-slate-400">
          {validSubTypes.length} options
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {validSubTypes.map((subType) => {
          const isActive = activeSubType === subType

          return (
            <button
              key={subType}
              type="button"
              onClick={() => handleSelect(subType)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isActive
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
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
