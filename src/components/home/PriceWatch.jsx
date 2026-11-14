import { Mail } from 'lucide-react'

function PriceWatch({
  email,
  onEmailChange,
  consent,
  onConsentChange,
  subscribed,
  onSubmit,
  categoryName
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Mail size={18} className="text-gray-700" aria-hidden="true" />
        <h2 className="font-semibold text-gray-900">Price Watch</h2>
      </div>

      <p className="mt-1 text-sm leading-6 text-gray-500">
        Register your interest in pricing updates for {categoryName.toLowerCase()} tools.
      </p>

      {subscribed ? (
        <p
          className="mt-4 rounded-xl bg-gray-100 px-4 py-3 text-sm leading-6 text-gray-700"
          role="status"
        >
          Your interest has been noted for this session. This demo does not
          send or store your email address.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <label htmlFor="price-watch-email" className="sr-only">
            Email address
          </label>

          <input
            id="price-watch-email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />

          <label className="flex items-start gap-2 text-xs leading-5 text-gray-600">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => onConsentChange(event.target.checked)}
              required
              className="mt-0.5"
            />
            I agree to receive Price Watch updates.
          </label>

          <button
            type="submit"
            disabled={!consent || !email.trim()}
            className="w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Register interest
          </button>
        </form>
      )}

      <p className="mt-3 text-[11px] leading-5 text-gray-400">
        Demo only: connect a subscription service to enable real notifications.
      </p>
    </article>
  )
}

export default PriceWatch
