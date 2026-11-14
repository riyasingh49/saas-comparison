import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function SummarySection({
  title = 'Find and compare business software',
  summary = '',
  details = '',
  pricingRange = '',
  sources = [],
  dateChecked = '',
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasAdditionalContent = Boolean(
    details || pricingRange || sources.length || dateChecked
  )

  return (
    <section
      className="border-b border-gray-200 bg-white"
      aria-labelledby="summary-heading"
    >
      <div className="container mx-auto px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <h1
            id="summary-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {title}
          </h1>

          {summary && (
            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
              {summary}
            </p>
          )}

          {hasAdditionalContent && (
            <div className="mt-3">
              {isExpanded && (
                <div className="space-y-3 text-sm leading-7 text-gray-600">
                  {details && <p>{details}</p>}

                  {pricingRange && (
                    <p>
                      <span className="font-medium text-gray-800">
                        Pricing:
                      </span>{' '}
                      {pricingRange}
                    </p>
                  )}

                  {dateChecked && (
                    <p className="text-xs text-gray-500">
                      Last checked: {dateChecked}
                    </p>
                  )}

                  {sources.length > 0 && (
                    <div>
                      <p className="mb-2 font-medium text-gray-800">
                        Information sources
                      </p>

                      <ul className="flex flex-wrap gap-2">
                        {sources.map((source, index) => {
                          const label =
                            typeof source === 'string'
                              ? source
                              : source?.label

                          const url =
                            typeof source === 'object'
                              ? source?.url
                              : null

                          if (!label) return null

                          return (
                            <li key={`${label}-${index}`}>
                              {url ? (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                                >
                                  {label}
                                </a>
                              ) : (
                                <span className="inline-flex rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">
                                  {label}
                                </span>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                aria-expanded={isExpanded}
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                {isExpanded ? (
                  <>
                    Read less
                    <ChevronUp size={16} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Read more
                    <ChevronDown size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SummarySection
