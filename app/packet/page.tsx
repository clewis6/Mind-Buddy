"use client"
import { useEffect, useRef, useState } from 'react'
import DisclaimerGate from '../../components/DisclaimerGate'
import PDFExport from '../../components/PDFExport'

export default function PacketPage(){
  const [narrative,setNarrative] = useState('Adult with anxiety and panic, trouble sleeping, homeless in Show Low AZ.')
  const [location,setLocation] = useState('')
  const [result,setResult] = useState<any>(null)
  const rootRef = useRef<HTMLDivElement|null>(null)

  async function generate(){
    const res = await fetch('/api/packet', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ narrative, location }) })
    const data = await res.json()
    setResult(data)
    // merge manual packet
    const draft = JSON.parse(localStorage.getItem('draftPacket')||'[]')
    setResult((prev:any)=> ({ ...data, provider: { ...data.provider, items: [...data.provider.items, ...draft.map((slug:string)=>({ slug, title: slug, why:'Manually added'}))] } }))
  }

  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold">Packet Builder</h1>
        <PDFExport rootRef={rootRef} filename={`packet-${Date.now()}.pdf`} />
      </div>
      <p className="text-sm text-gray-600">Describe client (no names/PHI). Optional: city/state or zip.</p>
      <div className="mt-3 grid gap-2">
        <textarea rows={5} className="p-3 border rounded" value={narrative} onChange={(e)=>setNarrative(e.target.value)} />
        <input className="p-2 border rounded" placeholder="City, State or Zip (optional)" value={location} onChange={(e)=>setLocation(e.target.value)} />
        <DisclaimerGate>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded" onClick={generate}>Generate</button>
        </DisclaimerGate>
      </div>

      {result && (
        <div ref={rootRef} className="mt-5 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Provider View</h2>
          <p className="text-sm text-gray-700">{result.provider.summary}</p>
          {result.provider.warnings?.length? (<ul className="text-rose-700 list-disc list-inside bg-rose-50 border border-rose-100 rounded p-2">{result.provider.warnings.map((w:string,i:number)=>(<li key={i}>{w}</li>))}</ul>): null}
          <h3 className="mt-3 font-semibold">Recommended Items</h3>
          <ul className="list-disc list-inside text-sm">{result.provider.items.map((it:any)=>(<li key={it.slug}><a href={`/library/${it.slug}`} className="text-blue-700">{it.title}</a> — {it.why}</li>))}</ul>

          <h2 className="mt-5 text-xl font-semibold">Patient View</h2>
          <p className="text-sm text-gray-700">{result.patient.summary}</p>
          <h3 className="mt-2 font-semibold">Homework Plan</h3>
          <ol className="list-decimal list-inside text-sm">{result.patient.homework.map((w:any,i:number)=>(<li key={i}>Week {w.week}: {w.tasks.join('; ')}</li>))}</ol>

          <h3 className="mt-3 font-semibold">Local Resources</h3>
          <ul className="text-sm">{result.resources.map((r:any,i:number)=>(<li key={i}><strong>{r.name}</strong> — {r.category} — {r.phone} {r.website?`— ${r.website}`:''}</li>))}</ul>
        </div>
      )}
    </div>
  )
}
