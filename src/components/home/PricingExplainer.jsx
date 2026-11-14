import heroImage from '../../assets/hero.png'

const chapters = [
  'Choose a category and sub-type',
  'Review published plan prices',
  'Estimate costs for your team',
  'Compare two to four tools',
]

function PricingExplainer({ videoSrc = '' }) {
  return (
    <section
      className="container mx-auto px-4 py-6"
      aria-labelledby="pricing-explainer-heading"
    >
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white sm:grid sm:grid-cols-2">
        <div className="relative min-h-52 bg-gray-900">
          {videoSrc ? (
            <video
              className="h-full min-h-52 w-full object-cover"
              src={videoSrc}
              poster={heroImage}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="SaaS comparison explainer video"
            />
          ) : (
            <>
              <img
                src={heroImage}
                alt="Illustration of software comparison research"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-3">
                <p className="text-xs text-white">
                  Explainer video poster
                </p>
                <p className="mt-1 text-[11px] text-gray-200">
                  Add a video file to enable playback.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            How it works
          </p>

          <h2
            id="pricing-explainer-heading"
            className="mt-2 text-lg font-semibold text-gray-900"
          >
            How SaaS pricing works
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Use published plan prices as a starting point, then check plan
            limits, billing terms and add-ons before buying.
          </p>

          <ol className="mt-4 space-y-2">
            {chapters.map((chapter, index) => (
              <li
                key={chapter}
                className="flex gap-3 text-sm text-gray-700"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  {index + 1}
                </span>
                {chapter}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default PricingExplainer
