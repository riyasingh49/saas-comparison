const videoId = 'ydyjI39LlNw'

const videoUrl =
  `https://www.youtube-nocookie.com/embed/${videoId}` +
  '?autoplay=1&mute=1&controls=1&playsinline=1&loop=1' +
  `&playlist=${videoId}&rel=0`

const chapters = [
  { time: '00:00', seconds: 0, title: 'Pay-as-you-go pricing' },
  { time: '00:18', seconds: 18, title: 'Per-user pricing' },
  { time: '00:31', seconds: 31, title: 'Tiered pricing' },
  { time: '00:42', seconds: 42, title: 'Flat-rate pricing' },
  { time: '00:58', seconds: 58, title: 'Feature-based pricing' },
  { time: '01:14', seconds: 74, title: 'Bundling' },
  { time: '01:27', seconds: 87, title: 'Freemium' },
  { time: '01:40', seconds: 100, title: 'Hybrid pricing' },
  { time: '01:52', seconds: 112, title: 'Choosing a pricing model' },
]

function PricingExplainer() {
  return (
    <section
      className="container mx-auto px-4 py-6"
      aria-labelledby="pricing-explainer-heading"
    >
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white sm:grid sm:grid-cols-2">
        <div className="relative aspect-video min-h-52 bg-gray-900">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={videoUrl}
            title="8 SaaS pricing models explained by Binary Stream Software"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            How it works
          </p>

          <h2
            id="pricing-explainer-heading"
            className="mt-2 text-lg font-semibold text-gray-900"
          >
            Understand SaaS pricing models
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Learn how software providers charge for subscriptions,
            users, features and usage before comparing plans for
            your team.
          </p>

          <h3 className="mt-4 text-sm font-semibold text-gray-800">
            Video chapters
          </h3>

          <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {chapters.map((chapter) => (
              <li key={chapter.seconds}>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}&t=${chapter.seconds}s`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                  aria-label={`Watch ${chapter.title} starting at ${chapter.time}`}
                >
                  <span className="shrink-0 font-mono text-xs text-gray-500">
                    {chapter.time}
                  </span>
                  <span>{chapter.title}</span>
                </a>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-xs text-gray-400">
            Video by Binary Stream Software. Opens on YouTube when
            a chapter is selected.
          </p>

          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  )
}

export default PricingExplainer
