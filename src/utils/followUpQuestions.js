import templates from '../data/follow-up-question-templates.json' with { type: 'json' }

function getFollowUpQuestions(categoryName, subcategory = '') {
  const categoryTemplates = templates[categoryName]

  if (!Array.isArray(categoryTemplates)) {
    return [
      'Which features are included in the listed price?',
      'What limits or additional charges should be checked?',
      'How does the tool compare for your team size?'
    ]
  }

  const subtype = String(subcategory || '').trim() || 'your selected workflow'

  return categoryTemplates.map((question) =>
    question.replaceAll('{{subtype}}', subtype)
  )
}

export default getFollowUpQuestions