"use client"
import { useRef } from 'react'
import ReactToPrint from 'react-to-print'

export default function PDFExport({ rootRef, filename }: { rootRef: any, filename: string }){
  const compRef = useRef(null)
  return (
    <ReactToPrint
      trigger={() => <button className="px-3 py-1 border rounded">Download PDF</button>}
      content={() => rootRef.current}
      documentTitle={filename}
    />
  )
}
