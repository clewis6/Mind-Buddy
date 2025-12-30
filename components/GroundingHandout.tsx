"use client"
import { forwardRef } from 'react'
import { LibraryItem } from '../lib/types'
import { getEvidence } from '../lib/evidence'

export default forwardRef<HTMLDivElement, { item: LibraryItem }>(function GroundingHandout({ item }, ref){
  const ev = getEvidence(item.slug)
  return (
    <div ref={ref||null} className="handout bg-white rounded shadow">
      <div className="p-6 border-b bg-gradient-to-r from-emerald-100 via-teal-100 to-sky-100">
        <h1>5‑4‑3‑2‑1 Grounding</h1>
        <p className="text-sm italic text-gray-700">A speedy five‑senses reset to come back to the present.</p>
      </div>

      <div className="p-6 grid gap-4">
        <div className="section section--why">
          <div className="section-title">Why This Works</div>
          <div className="section-body">
            Focusing on the senses redirects attention from worry to what’s here and now, lowering arousal.
          </div>
        </div>

        <div className="section">
          <div className="section-title">Steps</div>
          <div className="section-body">
            <ol className="list-decimal list-inside space-y-1">
              <li>Name 5 things you can see.</li>
              <li>Name 4 things you can touch.</li>
              <li>Name 3 things you can hear.</li>
              <li>Name 2 things you can smell.</li>
              <li>Name 1 thing you can taste.</li>
            </ol>
          </div>
        </div>

        <div className="section section--homework">
          <div className="section-title">Homework Plan</div>
          <div className="section-body">
            Practice twice daily and during spikes. Keep notes below on what helps most.
          </div>
        </div>

        <div className="section">
          <div className="section-title">My Notes</div>
          <div className="section-body grid gap-2">
            <label className="block text-sm">What helped most?
              <textarea className="mt-1 w-full border rounded h-20 p-2 print:border-black"/>
            </label>
            <label className="block text-sm">Where will I practice?
              <input className="mt-1 w-full border rounded p-2 print:border-black"/>
            </label>
          </div>
        </div>

        {ev && (
          <div className="text-xs text-gray-600">
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
        <div className="text-xs text-gray-500">Educational support only • Not medical advice</div>
      </div>
    </div>
  )
})
