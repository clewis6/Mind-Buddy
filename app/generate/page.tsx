"use client"
import { useState, useRef } from 'react'
import { StructuredClientProfile, GenerationResponse } from '../../lib/types'
import { generateCarePackage } from '../../lib/clientApi'
import ResultsPanel from '../../components/ResultsPanel'
import DisclaimerGate from '../../components/DisclaimerGate'

export default function GeneratePage() {
  const [narrative, setNarrative] = useState('68-year-old female, homeless in Show Low AZ, depression, limited mobility, no family support.')
  const [cityState, setCityState] = useState('')
  const [setting, setSetting] = useState('outpatient')
  const [tone, setTone] = useState('warm-clinical')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GenerationResponse | null>(null)
  const disclaimerRef = useRef<HTMLDivElement | null>(null)

  async function onGenerate() {
    setError(null)
    setLoading(true)
    try {
      const res = await generateCarePackage({ narrative, overrideLocation: cityState, setting, tone })
      setResult(res)
    } catch (e: any) {
      setError(e?.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Generate Care Package</h1>
      <p className="text-sm text-gray-600 mt-1">Enter a short, non-identifying narrative about the client.</p>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <textarea className="w-full p-3 rounded border" rows={6} value={narrative} onChange={(e)=>setNarrative(e.target.value)} />

        <div className="flex gap-2">
          <input placeholder="city, state or zip (optional)" className="flex-1 p-2 border rounded" value={cityState} onChange={(e)=>setCityState(e.target.value)} />
          <select value={setting} onChange={(e)=>setSetting(e.target.value)} className="p-2 border rounded">
            <option value="outpatient">Outpatient</option>
            <option value="inpatient">Inpatient</option>
            <option value="community">Community</option>
          </select>
          <select value={tone} onChange={(e)=>setTone(e.target.value)} className="p-2 border rounded">
            <option value="warm-clinical">Warm - Clinical</option>
            <option value="clinical">Clinical</option>
          </select>
        </div>

        <DisclaimerGate>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onGenerate} disabled={loading}>{loading? 'Generating...':'Generate'}</button>
            <button className="px-4 py-2 border rounded" onClick={()=>{ setNarrative(''); setResult(null); setError(null); }}>Reset</button>
          </div>
        </DisclaimerGate>

        {error && <div className="text-red-600">{error}</div>}

        {result && <ResultsPanel data={result} />}
      </div>
    </div>
  )
}
