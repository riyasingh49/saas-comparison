import { Check, X } from 'lucide-react'

function ComparisonFeatureValue({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-700">
        <Check size={13} className="shrink-0" />
        Yes
      </span>
    )
  }

  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
        <X size={13} className="shrink-0 text-gray-400" />
        No
      </span>
    )
  }

  if (value === null || value === undefined || value === '') {
    return <span className="text-xs text-gray-400">Not verified</span>
  }

  return (
    <span className="text-xs leading-4 text-gray-700">
      {String(value)}
    </span>
  )
}

export default ComparisonFeatureValue
