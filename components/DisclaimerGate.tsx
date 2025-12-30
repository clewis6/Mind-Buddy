"use client"
import { useState, ReactNode } from 'react'

export default function DisclaimerGate({ children }: { children: ReactNode }){
  const [accepted, setAccepted] = useState(false)

  return (
    <div>
      {!accepted ? (
        <div className="p-4 border rounded bg-yellow-50">
          <p className="text-sm">Please confirm: <strong>No identifying info.</strong> This is decision-support and education, not medical advice. Verify with clinical judgment. Resource availability may change.</p>
          <div className="mt-3 flex gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={(e)=>setAccepted(e.target.checked)} />
              <span className="text-sm">I confirm</span>
            </label>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}
