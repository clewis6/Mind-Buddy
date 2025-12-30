"use client"
import { useState, useRef } from 'react'
import { GenerationResponse } from '../lib/types'
import Tabs from './Tabs'
import CopyButton from './CopyButton'
import PDFExport from './PDFExport'

export default function ResultsPanel({ data }: { data: GenerationResponse }){
  const [tab, setTab] = useState<'provider'|'patient'>('provider')
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">Results</h3>
        <div className="flex gap-2">
          <CopyButton getText={()=>JSON.stringify(data, null, 2)} />
          <PDFExport rootRef={ref} filename={`careplan-${Date.now()}.pdf`} />
        </div>
      </div>

      <Tabs active={tab} onChange={(t)=>setTab(t)} items={[{key:'provider',label:'Provider Plan'},{key:'patient',label:'Patient Handout'}]} />

      <div ref={ref} className="mt-4">
        {tab === 'provider' ? (
          <div>
            <h4 className="font-semibold">Summary</h4>
            <p className="text-sm text-gray-700">{data.providerPlan.summary}</p>
            <h4 className="mt-3 font-semibold">Problems</h4>
            <ul className="list-disc list-inside text-sm text-gray-700">{data.providerPlan.problems.map((p: string, i: number)=><li key={i}>{p}</li>)}</ul>

            <h4 className="mt-3 font-semibold">Goals</h4>
            <ol className="list-decimal list-inside text-sm text-gray-700">{data.providerPlan.goals.map((g: string, i: number)=><li key={i}>{g}</li>)}</ol>

            <h4 className="mt-3 font-semibold">Interventions</h4>
            <ul className="list-disc list-inside text-sm text-gray-700">{data.providerPlan.interventions.map((val: string, idx: number)=><li key={idx}>{val}</li>)}</ul>

          </div>
        ) : (
          <div>
            <h4 className="font-semibold">Plain Summary</h4>
            <p className="text-sm text-gray-700">{data.patientHandout.plainSummary}</p>
            <h4 className="mt-3 font-semibold">Next Steps</h4>
            <ol className="list-decimal list-inside text-sm text-gray-700">{data.patientHandout.nextSteps.map((s: string, i: number)=><li key={i}>{s}</li>)}</ol>
            <h4 className="mt-3 font-semibold">Resources</h4>
            <ul className="list-inside text-sm text-gray-700">{data.resources.map((r)=> (<li key={r.name}><strong>{r.name}</strong> — {r.category} — {r.phone}{r.website?` — ${r.website}`:''}</li>))}</ul>
          </div>
        )}
      </div>
    </div>
  )
}
