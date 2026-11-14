import { Calculator, Users, TrendingUp } from 'lucide-react'
import AnnualMonthlyTool from './toolkit/AnnualMonthlyTool'
import UnusedSeatsTool from './toolkit/UnusedSeatsTool'
import RenewalIncreaseTool from './toolkit/RenewalIncreaseTool'

function SaaSToolkit() {
  return (
    <section
      className="container mx-auto px-4 py-8"
      aria-labelledby="saas-toolkit-heading"
    >
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Planning tools
        </p>
        <h2
          id="saas-toolkit-heading"
          className="mt-1 text-xl font-semibold text-gray-900"
        >
          SaaS cost toolkit
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Explore billing choices, unused licences and renewal increases.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <div className="mb-2 flex items-center gap-2 text-gray-700">
            <Calculator size={16} />
            <span className="text-xs font-medium">Billing comparison</span>
          </div>
          <AnnualMonthlyTool />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-gray-700">
            <Users size={16} />
            <span className="text-xs font-medium">Licence usage</span>
          </div>
          <UnusedSeatsTool />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-gray-700">
            <TrendingUp size={16} />
            <span className="text-xs font-medium">Renewal planning</span>
          </div>
          <RenewalIncreaseTool />
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-gray-500">
        These tools provide estimates from the values entered. They do not
        include taxes, add-ons, discounts or contract-specific terms.
      </p>
    </section>
  )
}

export default SaaSToolkit
