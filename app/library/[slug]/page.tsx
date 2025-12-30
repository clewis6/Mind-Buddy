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
      <div className="mt-2 text-xs text-gray-700">Tags: {item.diagnoses.join(', ')} • {item.topics.join(', ')} • {item.modality.join(', ')}</div>
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
      <div className="mt-3">
        <button onClick={()=>{
          const draft = JSON.parse(localStorage.getItem('draftPacket')||'[]')
          localStorage.setItem('draftPacket', JSON.stringify([...draft, item.slug]))
        }} className="px-4 py-2 bg-emerald-600 text-white rounded">Add to Packet</button>
      </div>
    </div>
  )
}
