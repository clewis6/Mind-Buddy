"use client"
import data from '../../../data/library.json'
import { useMemo, useRef } from 'react'
import { notFound } from 'next/navigation'
import PDFExport from '../../../components/PDFExport'
import HandoutRenderer from '../../../components/HandoutRenderer'
import PanicCycleHandout from '../../../components/PanicCycleHandout'
import GroundingHandout from '../../../components/GroundingHandout'
import ActivationHandout from '../../../components/ActivationHandout'
import UrgeSurfingHandout from '../../../components/UrgeSurfingHandout'
import { LibraryItem } from '../../../lib/types'

export default function ItemPage({ params }: { params: { slug: string } }){
  const items = data as LibraryItem[]
  const item = useMemo(()=> items.find(i=> i.slug === params.slug),[params.slug, items])
  const printRef = useRef<HTMLDivElement|null>(null)
  if (!item) return notFound()
  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold">{item.title}</h1>
        <PDFExport rootRef={printRef} filename={`${item.slug}.pdf`} />
      </div>
      <p className="text-sm text-gray-600">{item.type} • {item.minutesToComplete} min</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {item.topics.slice(0,6).map(t=> (
          <span key={t} className={`px-2 py-0.5 rounded-full text-xs border ${t.toLowerCase().includes('grounding')? 'bg-brand.emerald.100' : t.toLowerCase().includes('activation')? 'bg-brand.amber.100' : t.toLowerCase().includes('panic')? 'bg-brand.rose.100' : t.toLowerCase().includes('breath')? 'bg-brand.sky.100' : 'bg-gray-100'}`}>{t}</span>
        ))}
      </div>
      {item.slug === 'anxiety-panic-cycle' ? (
        <PanicCycleHandout ref={printRef} item={item} />
      ) : item.slug.includes('grounding') ? (
        <GroundingHandout ref={printRef} item={item} />
      ) : item.slug.includes('behavioral-activation') ? (
        <ActivationHandout ref={printRef} item={item} />
      ) : item.slug.includes('urge-surfing') ? (
        <UrgeSurfingHandout ref={printRef} item={item} />
      ) : (
        <HandoutRenderer ref={printRef} item={item} />
      )}
      <div className="mt-3 flex gap-2">
        <button onClick={()=>{
          const draft = JSON.parse(localStorage.getItem('draftPacket')||'[]')
          localStorage.setItem('draftPacket', JSON.stringify([...draft, item.slug]))
        }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 transition text-white rounded">Add to Packet</button>
        <a href="/library" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded">Back to Library</a>
      </div>
    </div>
  )
}
