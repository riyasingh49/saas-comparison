import { useState } from 'react'
import { Copy, Mail, Share2 } from 'lucide-react'
import GuidedRecommendation from './GuidedRecommendation'

function DecisionSupport({
  categoryName = 'software',
  vendors = [],
  region = 'US',
  onRecommendationsChange,
}) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyPage = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const sharePage = async () => {
    if (!navigator.share) {
      await copyPage()
      return
    }

    try {
      await navigator.share({
        title: 'SaaS comparison',
        url: window.location.href,
      })
    } catch (error) {
      if (error?.name !== 'AbortError') {
        await copyPage()
      }
    }
  }

  const handlePriceWatchSubmit = (event) => {
    event.preventDefault()

    if (!consent || !email.trim()) {
      return
    }

    // This is a local demo state; no email is sent or stored.
    setSubscribed(true)
  }

  return (
    <section
      className="container mx-auto grid gap-5 px-4 py-8 lg:grid-cols-2"
      aria-label="Decision support"
    >
      <GuidedRecommendation
        vendors={vendors}
        region={region}
        onRecommendationsChange={onRecommendationsChange}
      />

      <div className="space-y-5">
        <article className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-gray-700" />

            <h2 className="font-semibold text-gray-900">
              Price Watch
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Get a note when we update tracked pricing for{' '}
            {categoryName.toLowerCase()} tools.
          </p>

          {subscribed ? (
            <p className="mt-4 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
              Your interest has been noted for this session.
              This demo does not send or store emails.
            </p>
          ) : (
            <form
              onSubmit={handlePriceWatchSubmit}
              className="mt-4 space-y-3"
            >
              <label
                className="sr-only"
                htmlFor="price-watch-email"
              >
                Email address
              </label>

              <input
                id="price-watch-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />

              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) =>
                    setConsent(event.target.checked)
                  }
                  className="mt-0.5"
                />

                I agree to receive Price Watch updates.
              </label>

              <button
                type="submit"
                disabled={!consent || !email.trim()}
                className="w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold text-gray-900">
            What people ask next
          </h2>

          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>
              Is there a free plan, and what are its limits?
            </li>
            <li>
              Which plan includes the features we need?
            </li>
            <li>
              What costs are not included in the listed price?
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyPage}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <Copy size={14} aria-hidden="true" />
              {copied ? 'Copied' : 'Copy link'}
            </button>

            <button
              type="button"
              onClick={sharePage}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <Share2 size={14} aria-hidden="true" />
              Share
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}

export default DecisionSupport
