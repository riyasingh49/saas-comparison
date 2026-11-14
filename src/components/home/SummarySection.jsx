import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

function SummarySection({
  title = 'Compare SaaS software',
  summary = 'Explore software categories, discover available tools, and compare their features and pricing to find options that match your requirements.',
  details = 'Browse the available categories and their subcategories to narrow down your search. Explore individual vendors, review their available information, and compare relevant features side by side. Comparison details will be based on the available source data.',
  pricingRange = '',
  sources = [],
  dateChecked = '',
}) {
  const [expanded, setExpanded] = useState(false)

  const validSources = Array.isArray(sources)
    ? sources.filter((source) => source?.label && source?.url)
    : []

  return (
    <section className="container mx-auto py-6 sm:py-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
        <div className="max-w-4xl">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
            {title}
          </h1>

          {pricingRange && (
            <div className="mt-4 inline-flex flex-wrap items-baseline gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <span className="text-sm text-gray-500">
                Monthly price per user
              </span>
              <span className="text-base font-semibold text-gray-900">
                {pricingRange}
              </span>
            </div>
          )}

          <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 sm:text-base">
            <p
              className={!expanded ? 'overflow-hidden' : ''}
              style={
                !expanded
                  ? {
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }
                  : undefined
              }
            >
              {summary}
            </p>

            {expanded && (
              <p className="text-gray-600">
                {details}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            className="mt-4 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-gray-800 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500"
          >
            {expanded ? 'Read less' : 'Read more'}
            {expanded ? (
              <ChevronUp size={17} />
            ) : (
              <ChevronDown size={17} />
            )}
          </button>

          {(validSources.length > 0 || dateChecked) && (
            <div className="mt-6 border-t border-gray-100 pt-4">
              {validSources.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Sources
                  </span>

                  {validSources.map((source) => (
                    <a
                      key={`${source.label}-${source.url}`}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-100"
                    >
                      {source.label}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              )}

              {dateChecked && (
                <p className="mt-3 text-xs text-gray-500">
                  Pricing information last checked: {dateChecked}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SummarySection
