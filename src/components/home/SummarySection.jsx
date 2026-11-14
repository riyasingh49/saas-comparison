import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

function SummarySection({
  title = 'Find and compare business software',
  summary = '',
  details = '',
  pricingRange = '',
  sources = [],
  dateChecked = '',
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasExpandableContent = Boolean(
    summary || details || pricingRange || sources.length || dateChecked
  )

  const validSources = sources.filter((source) => {
    if (typeof source === 'string') return Boolean(source.trim())

    return Boolean(source?.label)
  })

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
            <p
              className={`summary-preview mt-3 text-sm leading-7 text-gray-600 sm:text-base ${
                isExpanded ? 'summary-preview--expanded' : ''
              }`}
            >
              {summary}
            </p>
          )}

          {isExpanded && (
            <div
              id="summary-expanded-content"
              className="mt-4 space-y-4 text-sm leading-7 text-gray-600"
            >
              {details && <p>{details}</p>}

              {pricingRange && (
                <p>
                  <span className="font-semibold text-gray-800">
                    Pricing:
                  </span>{' '}
                  {pricingRange}
                </p>
              )}

              {dateChecked && (
                <p className="text-xs text-gray-500">
                  Pricing information checked: {dateChecked}
                </p>
              )}

              {validSources.length > 0 && (
                <div>
                  <p className="mb-2 font-semibold text-gray-800">
                    Verified information sources
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {validSources.map((source, index) => {
                      const label =
                        typeof source === 'string'
                          ? source
                          : source.label

                      const url =
                        typeof source === 'object'
                          ? source.url
                          : null

                      return (
                        <li key={`${label}-${index}`}>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                            >
                              <span className="break-words">{label}</span>
                              <ExternalLink
                                size={12}
                                className="shrink-0"
                                aria-hidden="true"
                              />
                            </a>
                          ) : (
                            <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
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

          {hasExpandableContent && (
            <button
              type="button"
              onClick={() => setIsExpanded((current) => !current)}
              aria-expanded={isExpanded}
              aria-controls="summary-expanded-content"
              className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-md text-sm font-semibold text-gray-700 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
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
          )}
        </div>
      </div>
    </section>
  )
}

export default SummarySection
