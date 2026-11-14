const VALID_CURRENCIES = new Set([
    'USD',
    'INR',
    'EUR',
    'GBP',
    'AUD',
    'CAD',
    'SGD',
  ]);
  
  function isValidPrice(value) {
    return (
      typeof value === 'number' &&
      Number.isFinite(value) &&
      value >= 0
    );
  }
  
  export function hasVerifiedPricingSource(vendor) {
    return (
      Array.isArray(vendor?.sources) &&
      vendor.sources.some(
        (source) =>
          source?.status === 'verified' &&
          source?.url &&
          source?.checkedAt
      )
    );
  }
  
  export function isVendorPricingVerified(vendor) {
    const currency = vendor?.pricing?.currency;
  
    return (
      vendor?.pricing?.status === 'verified' &&
      VALID_CURRENCIES.has(currency) &&
      hasVerifiedPricingSource(vendor)
    );
  }
  
  function getRatesFromBillingPeriod(plan) {
    const period = String(plan?.billingPeriod || '')
      .trim()
      .toLowerCase();
  
    const price = plan?.price;
  
    if (!isValidPrice(price) || price === 0) {
      return {
        monthly: null,
        annual: null,
      };
    }
  
    if (period.includes('monthly or annually')) {
      return {
        monthly: price,
        annual: price,
      };
    }
  
    if (
      period === 'monthly' ||
      period === 'month'
    ) {
      return {
        monthly: price,
        annual: null,
      };
    }
  
    if (
      period === 'annual' ||
      period === 'annually' ||
      period === 'yearly'
    ) {
      return {
        monthly: null,
        annual: price,
      };
    }
  
    return {
      monthly: null,
      annual: null,
    };
  }
  
  export function getPlanBillingRates(
    vendor,
    plan,
    billingOptions = {}
  ) {
    const fallback = getRatesFromBillingPeriod(plan);
  
    const override =
      billingOptions?.[vendor?.id]?.[plan?.name];
  
    const monthly = override
      ? override.monthly
      : fallback.monthly;
  
    const annual = override
      ? override.annual
      : fallback.annual;
  
    return {
      monthly: isValidPrice(monthly) ? monthly : null,
      annual: isValidPrice(annual) ? annual : null,
    };
  }
  
  export function getVerifiedPricingPlans(
    vendor,
    billingOptions = {}
  ) {
    if (!isVendorPricingVerified(vendor)) {
      return [];
    }
  
    if (!Array.isArray(vendor.pricing.plans)) {
      return [];
    }
  
    return vendor.pricing.plans
      .filter(
        (plan) =>
          plan &&
          typeof plan.name === 'string' &&
          plan.name.trim() &&
          isValidPrice(plan.price) &&
          plan.price > 0
      )
      .map((plan) => ({
        ...plan,
        rates: getPlanBillingRates(
          vendor,
          plan,
          billingOptions
        ),
      }))
      .filter(
        (plan) =>
          plan.rates.monthly !== null ||
          plan.rates.annual !== null
      );
  }
  
  export function calculateSoftwareCost({
    monthlyRate,
    annualRate,
    seats,
  }) {
    const safeSeats = Math.min(
      10000,
      Math.max(1, Math.floor(Number(seats) || 1))
    );
  
    const validMonthlyRate = isValidPrice(monthlyRate)
      ? monthlyRate
      : null;
  
    const validAnnualRate = isValidPrice(annualRate)
      ? annualRate
      : null;
  
    const monthlyTotal =
      validMonthlyRate === null
        ? null
        : validMonthlyRate * safeSeats;
  
    const annualTotal =
      validAnnualRate === null
        ? null
        : validAnnualRate * safeSeats * 12;
  
    const annualSavings =
      validMonthlyRate !== null &&
      validAnnualRate !== null
        ? Math.max(
            0,
            (validMonthlyRate - validAnnualRate) *
              safeSeats *
              12
          )
        : null;
  
    return {
      seats: safeSeats,
      monthlyTotal,
      annualTotal,
      annualSavings,
      monthlyRate: validMonthlyRate,
      annualRate: validAnnualRate,
    };
  }
  
  export function getVerifiedPricingRange(
    vendors = [],
    region = 'US',
    billingOptions = {}
  ) {
    const pricesByCurrency = new Map();
  
    vendors.forEach((vendor) => {
      const plans = getVerifiedPricingPlans(
        vendor,
        billingOptions
      );
  
      plans.forEach((plan) => {
        // Annual rates are used where available because they
        // represent the lower published monthly equivalent.
        const price =
          plan.rates.annual ?? plan.rates.monthly;
  
        if (price === null) return;
  
        const currency = vendor.pricing.currency;
  
        if (!pricesByCurrency.has(currency)) {
          pricesByCurrency.set(currency, []);
        }
  
        pricesByCurrency.get(currency).push(price);
      });
    });
  
    const currencies = [...pricesByCurrency.keys()];
  
    currencies.sort((a, b) => {
      if (region === 'IN') {
        if (a === 'INR') return -1;
        if (b === 'INR') return 1;
      }
  
      if (region !== 'IN') {
        if (a === 'USD') return -1;
        if (b === 'USD') return 1;
      }
  
      return a.localeCompare(b);
    });
  
    return currencies.map((currency) => {
      const prices = pricesByCurrency.get(currency);
  
      return {
        currency,
        minimum: Math.min(...prices),
        maximum: Math.max(...prices),
      };
    });
  }
  