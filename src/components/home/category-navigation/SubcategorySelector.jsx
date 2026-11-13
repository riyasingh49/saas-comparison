function SubcategorySelector({
    categoryName,
    subTypes = [],
    activeSubType = '',
    onSelectSubType,
  }) {
    if (!Array.isArray(subTypes) || subTypes.length === 0) {
      return null
    }
  
    return (
      <div className="mt-5 border-t border-slate-200 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-800">
            {categoryName} options
          </h3>
  
          <span className="shrink-0 text-xs text-slate-400">
            {subTypes.length} options
          </span>
        </div>
  
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          aria-label={`${categoryName} subcategories`}
        >
          {subTypes.map((subType) => {
            const isActive = activeSubType === subType
  
            return (
              <button
                key={subType}
                type="button"
                onClick={() => {
                  onSelectSubType?.(
                    isActive ? '' : subType
                  )
                }}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
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
      </div>
    )
  }
  
  export default SubcategorySelector
  