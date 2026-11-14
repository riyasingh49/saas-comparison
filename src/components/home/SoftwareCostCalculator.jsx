import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { formatPrice } from '../comparison/comparison-section/formatPrice'

function getPaidPlans(vendor) {
  return (vendor?.pricing?.plans || []).filter(
    (plan) => Number.isFinite(plan?.price) && plan.price > 0
  )
}

function SoftwareCostCalculator({ vendors = [] }) {
  const availableVendors = vendors.filter((vendor) => getPaidPlans(vendor).length)
  const [vendorId, setVendorId] = useState('')
  const [planIndex, setPlanIndex] = useState(0)
  const [seats, setSeats] = useState(5)
  const [billing, setBilling] = useState('annual')

  const vendor = availableVendors.find((item) => item.id === vendorId) || availableVendors[0]
  const plans = getPaidPlans(vendor)
  const plan = plans[planIndex] || plans[0]
  const monthlyCost = (Number(plan?.price) || 0) * Math.max(1, Number(seats) || 1)
  const annualCost = monthlyCost * 12
  const billingLabel = billing === 'annual' ? 'billed annually' : 'monthly estimate'

  const examples = availableVendors.slice(0, 3).map((item) => item.name)

  if (!availableVendors.length) return null

  return (
    <section className="container mx-auto px-4 py-6" aria-labelledby="cost-calculator-heading">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white"><Calculator size={19} /></span>
          <div>
            <h2 id="cost-calculator-heading" className="text-lg font-semibold text-gray-900">Estimate your software cost</h2>
            <p className="mt-1 text-sm text-gray-500">Calculate seats × a published plan price. Taxes and add-ons are excluded.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-medium text-gray-700">Software
            <select value={vendor?.id || ''} onChange={(event) => { setVendorId(event.target.value); setPlanIndex(0) }} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm">
              {availableVendors.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-gray-700">Plan
            <select value={planIndex} onChange={(event) => setPlanIndex(Number(event.target.value))} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm">
              {plans.map((item, index) => <option key={`${item.name}-${index}`} value={index}>{item.name}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-gray-700">Seats
            <input type="number" min="1" max="10000" value={seats} onChange={(event) => setSeats(event.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
          </label>
          <fieldset className="text-sm font-medium text-gray-700"><legend>Billing view</legend><div className="mt-2 flex rounded-xl border border-gray-200 p-1"><button type="button" onClick={() => setBilling('annual')} aria-pressed={billing === 'annual'} className={`flex-1 rounded-lg px-2 py-1.5 text-xs ${billing === 'annual' ? 'bg-slate-900 text-white' : 'text-gray-600'}`}>Annual</button><button type="button" onClick={() => setBilling('monthly')} aria-pressed={billing === 'monthly'} className={`flex-1 rounded-lg px-2 py-1.5 text-xs ${billing === 'monthly' ? 'bg-slate-900 text-white' : 'text-gray-600'}`}>Monthly</button></div></fieldset>
        </div>

        <div className="mt-5 rounded-xl bg-slate-900 p-4 text-white sm:flex sm:items-center sm:justify-between">
          <div><p className="text-xs font-medium uppercase tracking-wide text-slate-300">{billingLabel}</p><p className="mt-1 text-2xl font-bold">{formatPrice(billing === 'annual' ? annualCost : monthlyCost, vendor?.pricing?.currency)}</p></div>
          <p className="mt-2 text-xs leading-5 text-slate-300 sm:mt-0 sm:max-w-xs">Based on {plan?.name || 'the selected plan'} at {formatPrice(plan?.price, vendor?.pricing?.currency)} per {plan?.unit || 'seat/month'}.</p>
        </div>
        <p className="mt-3 text-xs text-gray-500">Available published pricing: {examples.join(', ')}{availableVendors.length > examples.length ? ', and more' : ''}.</p>
      </div>
    </section>
  )
}

export default SoftwareCostCalculator
