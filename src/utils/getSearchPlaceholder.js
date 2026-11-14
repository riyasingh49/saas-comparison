const examples = {
    crm: {
      default: 'Salesforce pricing',
      'Small team': 'Freshsales for small teams',
      'Sales pipeline': 'Pipedrive pricing',
      'Free plan': 'Zoho CRM free plan',
      Enterprise: 'Salesforce enterprise pricing',
    },
    'project-management': {
      default: 'Asana pricing',
      Kanban: 'Trello Kanban pricing',
      'Software teams': 'Jira pricing for software teams',
      Agencies: 'monday.com for agencies',
      'Free plan': 'ClickUp free plan',
    },
    accounting: {
      default: 'QuickBooks pricing',
      Freelancers: 'FreshBooks pricing',
      'Small business': 'Xero for small businesses',
      'GST invoicing': 'TallyPrime GST pricing',
      Inventory: 'Zoho Books inventory pricing',
    },
    'hr-payroll': {
      default: 'Keka payroll pricing',
      'Payroll only': 'greytHR payroll pricing',
      'Full HR suite': 'Rippling HR pricing',
      'India payroll': 'Keka India payroll',
      Contractors: 'Gusto contractor pricing',
    },
    'team-collaboration': {
      default: 'Slack vs Microsoft Teams',
      Chat: 'Slack team chat pricing',
      'Docs and wikis': 'team wiki software',
      Whiteboards: 'online team whiteboard tools',
    },
    'video-conferencing': {
      default: 'Zoom pricing',
      Meetings: 'Google Meet pricing',
      Webinars: 'Zoom webinar pricing',
      'Free plan limits': 'Webex free plan limits',
    },
    analytics: {
      default: 'Power BI pricing',
      'Product analytics': 'Mixpanel pricing',
      'BI dashboards': 'Tableau pricing',
      'Web analytics': 'Amplitude analytics pricing',
    },
    'reviews-comparisons': {
      default: 'G2 software reviews',
      'Review sites': 'G2 vs Capterra',
      'Head-to-head': 'compare software side by side',
      'How to read reviews': 'how to evaluate software reviews',
    },
  }
  
  function getSearchPlaceholder(category, subcategory = '') {
    if (!category?.id || !examples[category.id]) {
      return 'CRM, accounting, project management...'
    }
  
    const categoryExamples = examples[category.id]
    const example = categoryExamples[subcategory] || categoryExamples.default
  
    return `Try searching ${example}...`
  }
  
  export default getSearchPlaceholder
  