"use client"
import { forwardRef } from 'react'
import { LibraryItem } from '../lib/types'
import { getEvidence } from '../lib/evidence'

export default forwardRef<HTMLDivElement, { item: LibraryItem }>(function PanicCycleHandout({ item }, ref){
  const ev = getEvidence(item.slug)
  return (
    <div ref={ref||null} className="handout bg-white rounded shadow">
      <div className="p-6 border-b bg-gradient-to-r from-orange-100 via-pink-100 to-blue-100">
        <h1>Understanding the Panic Cycle</h1>
        <p className="text-sm italic text-gray-700">How anxiety grows—and how to break the loop.</p>
      </div>

      <div className="p-6">
        <div className="w-full flex justify-center" aria-label="Panic cycle illustration">
          <div className="w-full md:w-3/4 aspect-[16/9] rounded border print:border-black bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center text-gray-500 text-sm">
            The Panic Cycle (illustration placeholder)
          </div>
        </div>

        <div className="section section--why mt-6">
          <div className="section-title">Why This Matters:</div>
          <div className="section-body">
            <p>Avoiding triggers teaches your brain: “Dangerous! Better escape!”</p>
            <p className="mt-1">Facing fears gradually helps your brain learn: “I can handle this. I’m safe.”</p>
          </div>
        </div>

        <div className="section section--homework mt-4">
          <div className="section-title">Homework Plan:</div>
          <div className="section-body">
            <ul className="list-disc list-inside">
              <li>Today: Learn the skill—read this handout.</li>
              <li>Practice: 5–10 minutes daily for the next week.</li>
              <li>Track: Note what worked, what was hard, and one adjustment.</li>
              <li>Share: Bring notes to next session for review.</li>
            </ul>
          </div>
        </div>

        <div className="section mt-4">
          <div className="section-title">Tips & Variations</div>
          <div className="section-body text-sm">
            • Pair exposure with a coping anchor (paced breathing 4-2-6).<br/>
            • Start easy and repeat wins before leveling up.<br/>
            • Track SUDS (0–10) before/after to see progress.
          </div>
        </div>

        <div className="section mt-4">
          <div className="section-title">My Practice Plan:</div>
          <div className="section-body">
            <div className="text-sm">When will I practice?</div>
            <div className="mt-1 h-8 border rounded"/>
          </div>
        </div>
      </div>

      {ev && (
        <div className="px-6 pb-3 text-xs text-gray-600">
          <div className="font-semibold mb-1">Evidence & Why it works</div>
          <p className="mb-2">{ev.summary}</p>
          <ul className="list-disc list-inside mb-2">
            {ev.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
          </ul>
          <div className="font-semibold">References</div>
          <ul className="list-disc list-inside">
            {ev.references.map((r,i)=>(
              <li key={i}>
                {r.authors ? r.authors+ ' ' : ''}({r.year}). {r.title}{r.source ? `. ${r.source}`:''}{r.doi?`. doi:${r.doi}`:''}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="px-6 pb-6 text-xs text-gray-500">Educational support only • Not medical advice</div>
    </div>
  )
})
