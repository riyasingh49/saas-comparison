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
    return (
      <div
        className="flex gap-5 overflow-x-auto pb-4"
        aria-label="Software categories"
      >
        {categories.map((category) => {
          const Icon = categoryIcons[category.id] || LayoutGrid
          const isActive = activeCategoryId === category.id
  
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory?.(category)}
              aria-pressed={isActive}
              className="flex min-w-[76px] shrink-0 flex-col items-center gap-2"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full border transition duration-200 ${
                  isActive
                    ? 'border-indigo-100 bg-indigo-100 text-indigo-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                <Icon size={21} strokeWidth={1.8} />
              </span>
  
              <span
                className={`max-w-22.5 text-center text-xs leading-4 ${
                  isActive
                    ? 'font-semibold text-indigo-700'
                    : 'font-medium text-slate-600'
                }`}
              >
                {category.name}
              </span>
            </button>
          )
        })}
      </div>
    )
  }
  
  export default MainCategorySelector
  