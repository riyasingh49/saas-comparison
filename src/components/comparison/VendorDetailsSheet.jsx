import { useEffect } from 'react'
import { ExternalLink, X, Check, Minus } from 'lucide-react'

function VendorDetailsSheet({
  vendor,
  isOpen = false,
  onClose,
  onToggleCompare,
  isSelected = false,
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !vendor || !vendor.id || !vendor.name) {
    return null
  }

  const features = Object.entries(vendor.features || {})

  const formatLabel = (value) =>
    value
      .replace(/([A-Z])/g, ' $1')
      .replace(/[-_]/g, ' ')
      .replace(/^./, (char) => char.toUpperCase())

  const renderFeatureValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center gap-2 text-emerald-700">
          <Check size={16} />
          Included
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 text-slate-500">
          <Minus size={16} />
          Not included
        </span>
      )
    }

    if (value === null || value === undefined || value === '') {
      return <span className="text-slate-400">Not available</span>
    }

    return String(value)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="vendor-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <p className="text-sm font-semibold text-slate-500">
            Software details
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close vendor details"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-bold text-indigo-600">
              {vendor.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <h2
                id="vendor-details-title"
                className="text-xl font-bold text-slate-900 sm:text-2xl"
              >
                {vendor.name}
              </h2>

              {vendor.category && (
                <p className="mt-1 text-sm text-slate-500">
                  {vendor.category}
                </p>
              )}

              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Visit official website
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {vendor.description && (
            <div className="mt-7">
              <h3 className="text-sm font-semibold text-slate-900">
                About this software
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {vendor.description}
              </p>
            </div>
          )}

          {vendor.startingPrice && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Starting price
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {vendor.startingPrice}
              </p>
            </div>
          )}

          <div className="mt-7">
            <h3 className="text-sm font-semibold text-slate-900">
              Features and specifications
            </h3>

            {features.length > 0 ? (
              <dl className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200">
                {features.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <dt className="text-sm font-medium text-slate-600">
                      {formatLabel(key)}
                    </dt>

                    <dd className="text-sm font-medium text-slate-900 sm:text-right">
                      {renderFeatureValue(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                Detailed feature information is not available yet.
              </p>
            )}
          </div>

          <div className="mt-7">
            <button
              type="button"
              onClick={() => onToggleCompare?.(vendor)}
              className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isSelected
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isSelected ? 'Remove from comparison' : 'Add to comparison'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VendorDetailsSheet
