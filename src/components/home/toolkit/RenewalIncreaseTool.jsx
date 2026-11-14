import { useState } from 'react'
import { calculateRenewalIncrease } from '../../../utils/saasToolkit'
import { formatPrice } from '../../comparison/comparison-section/formatPrice'
import ToolkitResult from './ToolkitResult'

function RenewalIncreaseTool() {
  const [currentPrice, setCurrentPrice] = useState('1200')
  const [increasePercent, setIncreasePercent] = useState('10')

  const result = calculateRenewalIncrease({
    currentPrice,
    increasePercent,
  })

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Renewal price increase
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        See how a renewal price increase changes your annual bill.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-xs font-medium text-gray-700">
          Current annual price (USD)
          <input
            type="number"
            min="0"
            step="0.01"
            value={currentPrice}
            onChange={(event) => setCurrentPrice(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs font-medium text-gray-700">
          Increase (%)
          <input
            type="number"
            min="0"
            step="0.1"
            value={increasePercent}
            onChange={(event) => setIncreasePercent(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
      </div>

      {result ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ToolkitResult
            label="Price increase"
            value={formatPrice(result.increaseAmount, 'USD')}
          />
          <ToolkitResult
            label="New annual price"
            value={formatPrice(result.renewalPrice, 'USD')}
          />
          <div className="col-span-2">
            <ToolkitResult
              label="New monthly equivalent"
              value={formatPrice(result.monthlyEquivalent, 'USD')}
            />
          </div>
        </div>
      ) : (
        <p className="mt-3 text-xs text-red-600">
          Enter valid non-negative amounts.
        </p>
      )}
    </article>
  )
}

export default RenewalIncreaseTool
