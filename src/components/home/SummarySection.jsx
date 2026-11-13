import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function SummarySection({
  title = 'Compare SaaS software',
  summary = 'Explore software categories, discover available tools, and compare their features and pricing to find options that match your requirements.',
  details = 'Browse the available categories and their subcategories to narrow down your search. Explore individual vendors, review their available information, and compare relevant features side by side. Comparison details will be based on the available source data.',
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="container mx-auto py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="max-w-4xl">
          <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
            {title}
          </h1>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
            <p>{summary}</p>

            {expanded && (
              <p className="animate-in fade-in duration-200">
                {details}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          >
            {expanded ? 'Read less' : 'Read more'}

            {expanded ? (
              <ChevronUp size={17} />
            ) : (
              <ChevronDown size={17} />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default SummarySection
