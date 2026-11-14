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
  activeCategoryId = 'all',
  onSelectCategory,
}) {
  const validCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          category?.id && category?.name
      )
    : []

  const items = [
    {
      id: 'all',
      name: 'All',
      icon: LayoutGrid,
      category: null,
    },
    ...validCategories.map((category) => ({
      id: category.id,
      name: category.name,
      icon: categoryIcons[category.id] || LayoutGrid,
      category,
    })),
  ]

  return (
    <nav aria-label="Software categories">
      <ul className="flex gap-5 overflow-x-auto pb-4">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeCategoryId === item.id

          return (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelectCategory?.(item.category)}
                aria-pressed={isActive}
                className="group flex min-w-[76px] flex-col items-center gap-2 rounded-xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full border transition duration-200 ${
                    isActive
                      ? 'border-slate-800 bg-slate-800 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 group-hover:border-slate-400 group-hover:bg-slate-50'
                  }`}
                >
                  <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <span
                  className={`max-w-[100px] text-center text-xs leading-4 ${
                    isActive
                      ? 'font-semibold text-slate-900'
                      : 'font-medium text-slate-600'
                  }`}
                >
                  {item.name}
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
