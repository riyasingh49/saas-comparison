
import { useCallback, useMemo, useState } from 'react'
import {
  getRecommendationRanking,
} from '../utils/recommendationEngine'
import { isVendorPricingVerified } from '../utils/pricing'
import questions from '../data/guided-recommendation-questions.json'

const EMPTY_ANSWERS = {
  teamSize: '',
  budgetMax: '',
  mustHaveFeature: '',
  currentToolId: '',
}

function getRecommendationCurrency(vendors, region) {
  const currencies = [
    ...new Set(
      vendors
        .filter(isVendorPricingVerified)
        .map((vendor) => vendor.pricing.currency)
    ),
  ]

  if (region === 'IN' && currencies.includes('INR')) {
    return 'INR'
  }

  if (currencies.includes('USD')) {
    return 'USD'
  }

  if (currencies.length) {
    return currencies[0]
  }

  return region === 'IN' ? 'INR' : 'USD'
}

function formatBudgetLabel(value, currency) {
  const formatter = new Intl.NumberFormat(
    currency === 'INR' ? 'en-IN' : 'en-US',
    {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }
  )

  return `Up to ${formatter.format(value)} / user / month`
}

function useGuidedRecommendations({
  vendors = [],
  region = 'US',
  onRecommendationsChange,
} = {}) {
  const [answers, setAnswers] = useState(EMPTY_ANSWERS)

  const currency = useMemo(
    () => getRecommendationCurrency(vendors, region),
    [vendors, region]
  )

  const budgetOptions = useMemo(
    () => [
      ...questions.budgetPerUser.thresholds.map((value) => ({
        value: String(value),
        label: formatBudgetLabel(value, currency),
      })),
      {
        value: 'none',
        label: questions.budgetPerUser.flexibleLabel,
      },
    ],
    [currency]
  )

  const ranking = useMemo(
    () =>
      getRecommendationRanking(vendors, {
        ...answers,
        budgetCurrency: currency,
      }),
    [vendors, answers, currency]
  )

  const answerCount = Object.values(answers).filter(Boolean).length

  const updateAnswer = useCallback(
    (key, value) => {
      if (!Object.prototype.hasOwnProperty.call(EMPTY_ANSWERS, key)) {
        return
      }

      const nextAnswers = {
        ...answers,
        [key]: value,
      }

      setAnswers(nextAnswers)

      const nextRanking = getRecommendationRanking(
        vendors,
        {
          ...nextAnswers,
          budgetCurrency: currency,
        }
      )

      onRecommendationsChange?.(nextRanking.vendorIds)
    },
    [answers, vendors, currency, onRecommendationsChange]
  )

  const resetAnswers = useCallback(() => {
    setAnswers({ ...EMPTY_ANSWERS })
    onRecommendationsChange?.([])
  }, [onRecommendationsChange])

  const hasAnswers = answerCount > 0

  return {
    answers,
    currency,
    budgetOptions,
    ranking,
    answerCount,
    hasAnswers,
    updateAnswer,
    resetAnswers,
  }
}

export default useGuidedRecommendations
