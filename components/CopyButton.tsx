"use client"
import { useState } from 'react'

export default function CopyButton({ getText }: { getText: ()=>string }){
  const [ok, setOk] = useState(false)
  return (
    <button className="px-3 py-1 border rounded" onClick={async ()=>{ await navigator.clipboard.writeText(getText()); setOk(true); setTimeout(()=>setOk(false),2000); }}>{ok? 'Copied':'Copy'}</button>
  )
}
