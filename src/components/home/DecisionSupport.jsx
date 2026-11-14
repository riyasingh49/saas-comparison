import GuidedRecommendation from './GuidedRecommendation'
import PriceWatch from './PriceWatch'
import FollowUpFeedback from './FollowUpFeedback'
import VendorResearchPanel from './VendorResearchPanel'
import useDecisionSupport from '../../hooks/useDecisionSupport'

function DecisionSupport({
  categoryName = 'software',
  subcategory = '',
  vendors = [],
  region = 'US',
  onRecommendationsChange
}) {
  const support = useDecisionSupport({
    categoryName,
    subcategory,
    vendors
  })

  return (
    <section
      className="container mx-auto grid gap-5 px-4 py-8 lg:grid-cols-2"
      aria-label="Decision support and vendor research"
    >
      <GuidedRecommendation
        vendors={vendors}
        region={region}
        onRecommendationsChange={onRecommendationsChange}
      />

      <div className="space-y-5">
        <VendorResearchPanel research={support.research} />

        <PriceWatch
          email={support.email}
          onEmailChange={support.setEmail}
          consent={support.consent}
          onConsentChange={support.setConsent}
          subscribed={support.subscribed}
          onSubmit={support.handlePriceWatchSubmit}
          categoryName={categoryName}
        />

        <FollowUpFeedback
          questions={support.questions}
          rating={support.rating}
          onRatingChange={support.updateRating}
          copied={support.copied}
          onCopy={support.copyPage}
          onShare={support.sharePage}
        />
      </div>
    </section>
  )
}

export default DecisionSupport
