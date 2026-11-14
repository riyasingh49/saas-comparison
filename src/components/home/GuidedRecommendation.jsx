
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react'
import useGuidedRecommendations from '../../hooks/useGuidedRecommendations'
import questions from '../../data/guided-recommendation-questions.json'
import { formatPrice } from '../comparison/comparison-section/formatPrice'

function GuidedRecommendation({
  vendors = [],
  region = 'US',
  onRecommendationsChange,
}) {
  const {
    answers,
    budgetOptions,
    ranking,
    answerCount,
    hasAnswers,
    updateAnswer,
    resetAnswers,
  } = useGuidedRecommendations({
    vendors,
    region,
    onRecommendationsChange,
  })

  const currentToolOptions = vendors.filter(
    (vendor) => vendor?.id && vendor?.name
  )

  const resultMap = new Map(
    ranking.results.map((result) => [
      result.vendorId,
      result,
    ])
  )

  const topMatches = ranking.rankedVendors.slice(0, 3)

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Sparkles size={19} aria-hidden="true" />
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Guided shortlist
            </p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              Find software that fits your needs
            </h2>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Answer four quick questions to reorder the software
              recommendations below.
            </p>
          </div>
        </div>

        {hasAnswers && (
          <button
            type="button"
            onClick={resetAnswers}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-gray-700">
          {questions.teamSize.label}

          <select
            value={answers.teamSize}
            onChange={(event) =>
              updateAnswer('teamSize', event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Choose team size</option>

            {questions.teamSize.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          {questions.budgetPerUser.label}

          <select
            value={answers.budgetMax}
            onChange={(event) =>
              updateAnswer('budgetMax', event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Choose monthly budget</option>

            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          {questions.mustHaveFeature.label}

          <select
            value={answers.mustHaveFeature}
            onChange={(event) =>
              updateAnswer('mustHaveFeature', event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Choose an important feature</option>

            {questions.mustHaveFeature.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          {questions.currentTool.label}

          <select
            value={answers.currentToolId}
            onChange={(event) =>
              updateAnswer('currentToolId', event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Choose your current situation</option>

            <option value="none">
              {questions.currentTool.notUsingLabel}
            </option>

            {currentToolOptions.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}

            <option value="other">
              {questions.currentTool.otherLabel}
            </option>
          </select>
        </label>
      </div>

      <div
        className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4"
        aria-live="polite"
      >
        <p className="text-xs text-gray-500">
          {answerCount} of 4 questions answered
        </p>

        {hasAnswers && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700">
            <CheckCircle2 size={15} aria-hidden="true" />
            Recommendations updated
          </span>
        )}
      </div>

      {hasAnswers && topMatches.length > 0 && (
        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Your current top matches
          </h3>

          <div className="mt-3 space-y-3">
            {topMatches.map((vendor, index) => {
              const result = resultMap.get(vendor.id)

              return (
                <div
                  key={vendor.id}
                  className="flex flex-col gap-2 border-b border-gray-200 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {index + 1}. {vendor.name}
                      {index === 0 && (
                        <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-700">
                          Best match
                        </span>
                      )}
                    </p>

                    {result?.reasons?.length > 0 ? (
                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        {result.reasons.join(' · ')}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">
                        Not enough verified information to confirm
                        a specific preference match.
                      </p>
                    )}
                  </div>

                  {result?.monthlyTeamEstimate !== null &&
                    result?.monthlyTeamEstimate !== undefined && (
                      <p className="shrink-0 text-xs font-medium text-gray-700">
                        Est. team cost:{' '}
                        {formatPrice(
                          result.monthlyTeamEstimate,
                          result.currency
                        )}
                        /month
                      </p>
                    )}
                </div>
              )
            })}
          </div>

          <p className="mt-3 text-[11px] leading-5 text-gray-500">
            Estimates use the lowest verified published monthly
            equivalent where available. Team-size estimates use
            representative seat counts for each selected range.
            Actual quotes may differ.
          </p>
        </div>
      )}
    </article>
  )
}

export default GuidedRecommendation
