"use client"
import { forwardRef } from 'react'
import { LibraryItem } from '../lib/types'

type Props = { item: LibraryItem }

function skillSteps(item: LibraryItem): string[] {
  const t = item.topics.map(x=>x.toLowerCase())
  if (t.includes('grounding')) return [
    'Pick one object near you and name 5 things you see about it.',
    'Name 4 things you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
    'Breathe slowly while naming each item.'
  ]
  if (t.includes('activation') || t.includes('routine')) return [
    'List 3 tiny activities (5–10 min) that add energy, pleasure, or meaning.',
    'Schedule each activity on specific days and times.',
    'After each, rate mood 0–10 and note one observation.'
  ]
  if (t.includes('panic')) return [
    'Notice the first body cue and say: “This is uncomfortable and safe.”',
    'Do 2 minutes of paced breathing (inhale 4, hold 2, exhale 6).',
    'Stay in the situation if safe until sensations reduce by 2 points.'
  ]
  if (t.includes('cravings')) return [
    'Rate the urge 0–10; set a 10‑minute timer.',
    'Breathe, delay, and text a support person.',
    'Notice how the urge changes at 5 and 10 minutes.'
  ]
  return [
    'Read the overview and identify one key idea.',
    'Practice the skill for 5–10 minutes daily.',
    'Record what worked and one tweak for next time.'
  ]
}

const HandoutRenderer = forwardRef<HTMLDivElement, Props>(({ item }, ref) => {
  const today = new Date().toLocaleDateString()
  const steps = skillSteps(item)
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  return (
    <div ref={ref || null} className="p-6 bg-white rounded shadow">
      <header className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-semibold">{item.title}</h1>
        <p className="text-sm text-gray-600">Type: {item.type} • {item.minutesToComplete} min • Date: {today}</p>
        <p className="text-xs text-gray-500">Tags: {item.diagnoses.join(', ')} • {item.topics.join(', ')} • {item.modality.join(', ')}</p>
      </header>

      <section className="mt-3">
        <h2 className="font-semibold">Overview</h2>
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.summary}</p>
      </section>

      <section className="mt-4">
        <h2 className="font-semibold">Skill Steps</h2>
        <ol className="list-decimal list-inside text-sm text-gray-800 space-y-1">
          {steps.map((s,i)=>(<li key={i}>{s}</li>))}
        </ol>
      </section>

      <section className="mt-4">
        <h2 className="font-semibold">Homework Plan</h2>
        <ol className="list-decimal list-inside text-sm text-gray-800 space-y-2">
          <li>Today: Learn the skill — read this handout.</li>
          <li>Practice: 5–10 minutes daily for the next week.</li>
          <li>Track: Note what worked, what was hard, and one adjustment.</li>
          <li>Share: Bring notes to next session for review.</li>
        </ol>
      </section>

      <section className="mt-4">
        <h2 className="font-semibold">My Practice Plan</h2>
        <div className="text-sm grid gap-3">
          <label className="block">When will I practice?
            <input className="mt-1 w-full border rounded p-2 print:border-black" placeholder="e.g., 8:30pm after dinner, Mon/Wed/Fri" />
          </label>
          <label className="block">Where will I practice?
            <input className="mt-1 w-full border rounded p-2 print:border-black" placeholder="e.g., bedroom desk, quiet corner" />
          </label>
          <label className="block">What might get in the way?
            <textarea className="mt-1 w-full border rounded p-2 h-20 print:border-black" placeholder="e.g., tired, phone, noise" />
          </label>
          <label className="block">My backup plan if it’s hard:
            <textarea className="mt-1 w-full border rounded p-2 h-20 print:border-black" placeholder="e.g., shorten to 2 minutes, do breathing only, ask a friend" />
          </label>
        </div>
      </section>

      <section className="mt-4">
        <h2 className="font-semibold">Daily Log (this week)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {days.map(d=> (
            <div key={d} className="border rounded p-2 print:border-black">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="border" />
                <div className="font-medium">{d} — Practiced</div>
              </div>
              <div className="mt-1">
                <label className="block text-xs text-gray-600">Notes</label>
                <textarea className="mt-1 w-full border rounded h-16 p-2 print:border-black" placeholder="What did you notice?" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="font-semibold">Reflection</h2>
        <textarea className="mt-1 w-full border rounded h-24 p-2 text-sm print:border-black" placeholder="What helped most? What will you change next week?" />
      </section>

      <footer className="mt-6 text-xs text-gray-500">
        Educational support only • Not medical advice • Verify with your clinician
      </footer>
    </div>
  )
})

HandoutRenderer.displayName = 'HandoutRenderer'
export default HandoutRenderer
