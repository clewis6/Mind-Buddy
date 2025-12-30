import { GenerationResponse } from './types'

export async function generateCarePackage(payload: { narrative: string, overrideLocation?: string, setting?: string, tone?: string }): Promise<GenerationResponse> {
  const res = await fetch('/api/generate', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)})
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
