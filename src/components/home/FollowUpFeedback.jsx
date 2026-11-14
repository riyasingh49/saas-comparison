import { Check, Copy, Share2, Star } from 'lucide-react'

function FollowUpFeedback({
  questions,
  rating,
  onRatingChange,
  copied,
  onCopy,
  onShare
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="font-semibold text-gray-900">
        Questions to consider next
      </h2>

      <ul className="mt-3 space-y-2">
        {questions.map((question) => (
          <li
            key={question}
            className="flex gap-2 text-sm leading-6 text-gray-600"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gray-400" />
            {question}
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-sm font-medium text-gray-800">
          Was this comparison helpful?
        </p>

        <div className="mt-2 flex items-center gap-1" role="group" aria-label="Rate this comparison">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onRatingChange(value)}
              aria-label={`Rate ${value} out of 5`}
              aria-pressed={rating === value}
              className="rounded-md p-1 text-gray-400 transition hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            >
              <Star
                size={19}
                fill={value <= rating ? 'currentColor' : 'none'}
                className={value <= rating ? 'text-gray-800' : ''}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 text-xs text-gray-500" role="status">
              <Check size={13} aria-hidden="true" />
              Rating noted for this session
            </span>
          )}
        </div>

        <p className="mt-1 text-[11px] text-gray-400">
          Feedback is not submitted to a server in this demo.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          <Copy size={14} aria-hidden="true" />
          {copied ? 'Copied' : 'Copy link'}
        </button>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          <Share2 size={14} aria-hidden="true" />
          Share
        </button>
      </div>
    </article>
  )
}

export default FollowUpFeedback
