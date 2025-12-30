"use client"
import React from 'react'

type TabKey = string | number
type TabItem<K extends TabKey = string> = { key: K; label: string }

export default function Tabs<K extends TabKey>({ active, onChange, items }: { active: K, onChange: (k:K)=>void, items: TabItem<K>[] }){
  return (
    <div className="flex gap-2 mt-3">
      {items.map(it=> (
        <button key={it.key} onClick={()=>onChange(it.key)} className={`px-3 py-1 rounded ${active===it.key ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{it.label}</button>
      ))}
    </div>
  )
}
