import { useEffect } from 'react'
import { ExternalLink, Search, X } from 'lucide-react'

function VendorResearchPanel({
  research
}) {
  const {
    isOpen,
    query,
    setQuery,
    filteredVendors,
    activeVendor,
    activeVendorId,
    setActiveVendorId,
    openPanel,
    closePanel
  } = research

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closePanel()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closePanel])

  const formatPriceStatus = (vendor) => {
    if (vendor.pricing?.status === 'verified') {
      return 'Pricing data available'
    }

    if (vendor.pricing?.status === 'unverified') {
      return 'Pricing awaiting verification'
    }

    return 'Pricing status not confirmed'
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
      >
        <Search size={16} aria-hidden="true" />
        Search vendor research
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-950/40"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanel()
          }}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="vendor-research-heading"
            className="ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-xl"
          >
            <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2
                  id="vendor-research-heading"
                  className="text-lg font-semibold text-gray-900"
                >
                  Vendor research
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Search available vendors and inspect their published information.
                </p>
              </div>

              <button
                type="button"
                onClick={closePanel}
                aria-label="Close vendor research"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </header>

            <div className="border-b border-gray-200 p-4">
              <label
                htmlFor="vendor-research-search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Find a vendor
              </label>

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />

                <input
                  id="vendor-research-search"
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setActiveVendorId('')
                  }}
                  placeholder="Search by name, category or feature"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </div>

            <div className="grid min-h-0 flex-1 md:grid-cols-2">
              <div className="overflow-y-auto border-b border-gray-200 p-3 md:border-b-0 md:border-r">
                <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {filteredVendors.length} vendors
                </p>

                {filteredVendors.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">
                    No vendors match that search. Try another name or feature.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {filteredVendors.map((vendor) => (
                      <li key={vendor.id}>
                        <button
                          type="button"
                          onClick={() => setActiveVendorId(vendor.id)}
                          aria-pressed={activeVendorId === vendor.id}
                          className={`w-full rounded-xl px-3 py-3 text-left transition ${
                            activeVendorId === vendor.id
                              ? 'bg-gray-100'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="block text-sm font-semibold text-gray-900">
                            {vendor.name}
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            {vendor.category || 'Category not specified'}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="overflow-y-auto p-5">
                {activeVendor ? (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {activeVendor.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {activeVendor.category}
                    </p>

                    <div className="mt-5 rounded-xl bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Research status
                      </p>
                      <p className="mt-2 text-sm text-gray-800">
                        {formatPriceStatus(activeVendor)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Last checked:{' '}
                        {activeVendor.verification?.checkedAt || 'Not recorded'}
                      </p>
                    </div>

                    {activeVendor.description &&
                      !activeVendor.description.toLowerCase().includes('awaiting verification') && (
                        <div className="mt-5">
                          <h4 className="text-sm font-semibold text-gray-900">
                            About
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {activeVendor.description}
                          </p>
                        </div>
                      )}

                    {activeVendor.pricing?.plans?.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Published plans in our data
                        </h4>

                        <ul className="mt-2 divide-y divide-gray-100 rounded-xl border border-gray-200">
                          {activeVendor.pricing.plans.map((plan, index) => (
                            <li
                              key={`${plan.name}-${index}`}
                              className="flex items-start justify-between gap-3 p-3"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {plan.name}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {plan.unit || 'Unit not specified'} · {plan.billingPeriod || 'Billing period not specified'}
                                </p>
                                {plan.note && (
                                  <p className="mt-1 text-xs text-gray-500">
                                    {plan.note}
                                  </p>
                                )}
                              </div>

                              <p className="shrink-0 text-sm font-semibold text-gray-900">
                                {typeof plan.price === 'number'
                                  ? new Intl.NumberFormat('en', {
                                      style: 'currency',
                                      currency: activeVendor.pricing.currency || 'USD',
                                      maximumFractionDigits: 2
                                    }).format(plan.price)
                                  : 'Price unavailable'}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-gray-900">
                        Sources
                      </h4>

                      {activeVendor.sources?.length > 0 ? (
                        <ul className="mt-2 space-y-3">
                          {activeVendor.sources.map((source, index) => (
                            <li key={`${source.url}-${index}`}>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-start gap-2 text-sm font-medium text-gray-800 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700"
                              >
                                <span>{source.label || 'Source website'}</span>
                                <ExternalLink
                                  size={13}
                                  className="mt-0.5 shrink-0"
                                  aria-hidden="true"
                                />
                              </a>
                              <p className="mt-1 text-xs text-gray-500">
                                Checked: {source.checkedAt || 'Date not recorded'}
                                {source.status === 'verified'
                                  ? ' · Verified source'
                                  : ' · Verification pending'}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-500">
                          No source links have been recorded for this vendor yet.
                        </p>
                      )}
                    </div>

                    {activeVendor.website && (
                      <a
                        href={activeVendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Visit vendor website
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full min-h-48 items-center justify-center text-center">
                    <p className="max-w-xs text-sm leading-6 text-gray-500">
                      Select a vendor to review its available pricing,
                      verification status, and source links.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

export default VendorResearchPanel
