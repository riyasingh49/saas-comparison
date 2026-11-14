import { useState } from 'react'
import { CheckCircle2, Copy, Mail, Share2 } from 'lucide-react'

const questions = [
  'How many people need access?',
  'What is your budget per user?',
  'Which feature is essential?',
  'Are you replacing a current tool?',
]

function DecisionSupport({ categoryName = 'software' }) {
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyPage = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true) } catch { setCopied(false) }
  }

  return (
    <section className="container mx-auto grid gap-5 px-4 py-8 lg:grid-cols-2" aria-label="Decision support">
      <article className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Guided shortlist</p>
        <h2 className="mt-2 text-lg font-semibold text-gray-900">Tell us what matters for {categoryName.toLowerCase()}</h2>
        <p className="mt-1 text-sm text-gray-500">Your answers stay in this browser and help you frame the comparison.</p>
        <div className="mt-4 grid gap-2">
          {questions.map((question) => <button key={question} type="button" onClick={() => setAnswers((current) => ({ ...current, [question]: !current[question] }))} aria-pressed={Boolean(answers[question])} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium ${answers[question] ? 'border-slate-900 bg-slate-50 text-slate-900' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}><span>{question}</span>{answers[question] && <CheckCircle2 size={17} />}</button>)}
        </div>
        <p className="mt-4 text-xs text-gray-500">{Object.keys(answers).length} of 4 priorities selected. Use the vendor cards and comparison table to review matching plans.</p>
      </article>

      <div className="space-y-5">
        <article className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2"><Mail size={18} className="text-slate-700" /><h2 className="font-semibold text-gray-900">Price Watch</h2></div>
          <p className="mt-1 text-sm text-gray-500">Get a note when we update tracked pricing. This demo stores no email.</p>
          {subscribed ? <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">You’re on the list for this session.</p> : <form onSubmit={(event) => { event.preventDefault(); if (consent && email) setSubscribed(true) }} className="mt-4 space-y-3"><label className="sr-only" htmlFor="price-watch-email">Email address</label><input id="price-watch-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" /><label className="flex items-start gap-2 text-xs text-gray-600"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5" />I agree to receive Price Watch updates.</label><button className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:bg-gray-300" disabled={!consent}>Subscribe</button></form>}
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-5"><h2 className="font-semibold text-gray-900">What people ask next</h2><ul className="mt-3 space-y-2 text-sm text-gray-600"><li>Is there a free plan, and what are its limits?</li><li>Which plan includes the features we need?</li><li>What costs are not included in the listed price?</li></ul><div className="mt-4 flex gap-2"><button type="button" onClick={copyPage} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700"><Copy size={14} />{copied ? 'Copied' : 'Copy link'}</button><button type="button" onClick={() => navigator.share?.({ title: 'SaaS comparison', url: window.location.href })} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700"><Share2 size={14} />Share</button></div></article>
      </div>
    </section>
  )
}

export default DecisionSupport
