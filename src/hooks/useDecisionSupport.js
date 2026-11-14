import { useState } from 'react'
import useVendorResearch from './useVendorResearch'
import getFollowUpQuestions from '../utils/followUpQuestions'

function useDecisionSupport({
  categoryName,
  subcategory,
  vendors
}) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [rating, setRating] = useState(0)
  const [copied, setCopied] = useState(false)

  const research = useVendorResearch(vendors)

  const questions = getFollowUpQuestions(categoryName, subcategory)

  const handlePriceWatchSubmit = (event) => {
    event.preventDefault()

    if (!consent || !email.trim()) return

    setSubscribed(true)
  }

  const copyPage = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable')
      }

      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      return true
    } catch {
      setCopied(false)
      return false
    }
  }

  const sharePage = async () => {
    if (typeof navigator.share !== 'function') {
      return copyPage()
    }

    try {
      await navigator.share({
        title: 'SaaS comparison',
        url: window.location.href
      })

      return true
    } catch (error) {
      if (error?.name === 'AbortError') return false
      return copyPage()
    }
  }

  const updateRating = (value) => {
    const numericValue = Number(value)

    if (Number.isInteger(numericValue) && numericValue >= 1 && numericValue <= 5) {
      setRating(numericValue)
    }
  }

  return {
    email,
    setEmail,
    consent,
    setConsent,
    subscribed,
    handlePriceWatchSubmit,
    questions,
    rating,
    updateRating,
    copied,
    copyPage,
    sharePage,
    research
  }
}

export default useDecisionSupport
