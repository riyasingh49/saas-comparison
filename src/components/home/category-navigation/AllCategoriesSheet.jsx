import { useEffect, useRef } from 'react'
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
  X,
  ChevronRight,
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

function AllCategoriesSheet({
  isOpen,
  categories = [],
  onClose,
  onSelectCategory,
}) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements?.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const validCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          category &&
          typeof category.id === 'string' &&
          typeof category.name === 'string'
      )
    : []

  const handleSelect = (category) => {
    onSelectCategory?.(category)
    onClose?.()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/40 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.()
        }
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="all-categories-title"
        className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-5">
          <div>
            <h2
              id="all-categories-title"
              className="text-lg font-semibold text-slate-900"
            >
              All categories
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose a category to explore its software.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close categories"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            <X size={19} />
          </button>
        </div>

        <div className="overflow-y-auto p-3">
          {validCategories.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {validCategories.map((category) => {
                const Icon = categoryIcons[category.id] || LayoutGrid

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleSelect(category)}
                    className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-indigo-600"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-800">
                        {category.name}
                      </span>

                      <span className="mt-1 block text-xs text-slate-500">
                        {Array.isArray(category.vendors)
                          ? `${category.vendors.length} software tools`
                          : 'Explore software tools'}
                      </span>
                    </span>

                    <ChevronRight
                      size={18}
                      className="shrink-0 text-slate-400"
                    />
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="px-4 py-10 text-center text-sm text-slate-500">
              No categories are available right now.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default AllCategoriesSheet
