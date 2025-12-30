"use client"
import { useMemo, useState, useEffect } from 'react'
import data from '../../data/library.json'
import Link from 'next/link'

const allDiagnoses = ['anxiety','depression','ptsd','bipolar','sud','adhd','grief']

export default function LibraryPage(){
  const [q,setQ] = useState('')
  const [dx,setDx] = useState<string[]>([])
  const items = data as any[]
  const filtered = useMemo(()=>{
    return items.filter(it => {
      const hitQ = q? (it.title.toLowerCase().includes(q.toLowerCase()) || it.summary.toLowerCase().includes(q.toLowerCase())) : true
      const hitDx = dx.length? dx.some(d=> it.diagnoses.includes(d)): true
      return hitQ && hitDx
    })
  },[q,dx])

  function toggleDx(d: string){ setDx(prev=> prev.includes(d)? prev.filter(x=>x!==d): [...prev,d]) }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Library</h1>
      <div className="mt-3 flex gap-2">
        <input className="flex-1 p-2 border rounded" placeholder="Search" value={q} onChange={(e)=>setQ(e.target.value)} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {allDiagnoses.map(d => (
          <button key={d} onClick={()=>toggleDx(d)} className={`px-3 py-1 rounded-full border text-sm ${dx.includes(d)?'bg-blue-600 text-white border-blue-600':'bg-white hover:border-blue-300'}`}>{d}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filtered.map(it => (
          <div key={it.slug} className="p-4 bg-white rounded shadow border">
            <h3 className="font-semibold flex items-center gap-2"><span>{it.type==='worksheet'?'📝':it.type==='skill'?'🎯':'📄'}</span><Link href={`/library/${it.slug}`}>{it.title}</Link></h3>
            <p className="text-sm text-gray-600">{it.type} • {it.minutesToComplete} min</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {it.topics.slice(0,4).map((t:string)=> (<span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-xs border">{t}</span>))}
            </div>
            <div className="mt-3 flex gap-2">
              <Link href={`/library/${it.slug}`} className="px-3 py-1 bg-gray-100 rounded">View</Link>
              <button onClick={()=>{
                const draft = JSON.parse(localStorage.getItem('draftPacket')||'[]')
                localStorage.setItem('draftPacket', JSON.stringify([...draft, it.slug]))
              }} className="px-3 py-1 bg-emerald-100 rounded">Add to Packet</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
