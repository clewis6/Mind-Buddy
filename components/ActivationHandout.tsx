"use client"
import { forwardRef } from 'react'
import { LibraryItem } from '../lib/types'
import { getEvidence } from '../lib/evidence'

export default forwardRef<HTMLDivElement, { item: LibraryItem }>(function ActivationHandout({ item }, ref){
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const ev = getEvidence(item.slug)
  return (
    <div ref={ref||null} className="handout bg-white rounded shadow">
      <div className="p-6 border-b bg-gradient-to-r from-yellow-100 via-amber-100 to-rose-100">
        <h1>Behavioral Activation</h1>
        <p className="text-sm italic text-gray-700">Tiny actions that gently lift energy and mood.</p>
      </div>
      <div className="p-6 grid gap-4">
        <div className="section section--why">
          <div className="section-title">Why This Works</div>
          <div className="section-body">Action precedes motivation: small meaningful steps can nudge energy and hope.</div>
        </div>
        <div className="section">
          <div className="section-title">Pick 3 Activities</div>
          <div className="section-body grid gap-2">
            {['Movement','Connection','Pleasure/Meaning'].map(t=> (
              <label key={t} className="block text-sm">{t}
                <input className="mt-1 w-full border rounded p-2 print:border-black" placeholder={`e.g., ${t==='Movement'?'5‑min walk':'text a friend'}`} />
              </label>
            ))}
          </div>
        </div>
        <div className="section">
          <div className="section-title">Weekly Schedule</div>
          <div className="section-body grid grid-cols-1 md:grid-cols-2 gap-2">
            {days.map(d=> (
              <div key={d} className="border rounded p-2 print:border-black">
                <div className="font-medium">{d}</div>
                <div className="mt-1 h-16 border rounded"/>
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <div className="section-title">After-Action Notes</div>
          <div className="section-body text-sm">Rate mood before/after 0–10 and jot one observation.</div>
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
