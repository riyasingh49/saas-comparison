import {
  Users,
  Workflow,
  Calculator,
  BriefcaseBusiness,
  MessageSquare,
  Video,
  ChartNoAxesCombined,
  Star,
  LayoutGrid,
} from 'lucide-react'

const categoryIcons = {
  crm: Users,
  'project-management': Workflow,
  accounting: Calculator,
  'hr-payroll': BriefcaseBusiness,
  'team-collaboration': MessageSquare,
  'video-conferencing': Video,
  analytics: ChartNoAxesCombined,
  'reviews-comparisons': Star,
}

function MainCategorySelector({
  categories = [],
  activeCategoryId,
  onSelectCategory,
}) {
  const validCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          category &&
          typeof category.id === 'string' &&
          typeof category.name === 'string'
      )
    : []

  if (validCategories.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
        No categories are available right now.
      </p>
    )
  }

  return (
    <nav aria-label="Software categories">
      <ul className="flex gap-5 overflow-x-auto pb-4">
        {validCategories.map((category) => {
          const Icon = categoryIcons[category.id] || LayoutGrid
          const isActive = activeCategoryId === category.id

          return (
            <li key={category.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelectCategory?.(category)}
                aria-pressed={isActive}
                className="group flex min-w-[76px] flex-col items-center gap-2 rounded-xl px-1 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full border transition duration-200 ${
                    isActive
                      ? 'border-indigo-100 bg-indigo-100 text-indigo-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-50'
                  }`}
                >
                  <Icon size={21} strokeWidth={1.8} />
                </span>

                <span
                  className={`max-w-[90px] text-center text-xs leading-4 ${
                    isActive
                      ? 'font-semibold text-indigo-700'
                      : 'font-medium text-slate-600'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainCategorySelector
