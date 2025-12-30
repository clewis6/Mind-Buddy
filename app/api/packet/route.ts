import { NextResponse } from 'next/server'
import { z } from 'zod'
import library from '../../../data/library.json'
import resources from '../../../data/resources.json'

const BodySchema = z.object({ narrative: z.string().min(5), location: z.string().optional() })

function extract(narrative: string){
  const lower = narrative.toLowerCase()
  const dx: string[] = []
  const topics: string[] = []
  const modality: string[] = []
  const ageGroup: string | undefined = /\bteen|adolescent\b/.test(lower) ? 'teen' : /\belderly|older adult|senior\b/.test(lower) ? 'adult' : undefined
  const needs: string[] = []
  const risk: string[] = []
  const dxKeywords = ['anxiety','depression','ptsd','trauma','bipolar','sud','adhd','grief']
  for (const k of dxKeywords){ if (lower.includes(k)) dx.push(k) }
  const topicKeywords = ['sleep','panic','rumination','cravings','boundaries','grounding','values','exposure']
  for (const k of topicKeywords){ if (lower.includes(k)) topics.push(k) }
  const modalityKeywords = ['cbt','dbt','act','mi']
  for (const k of modalityKeywords){ if (lower.includes(k)) modality.push(k.toUpperCase()) }
  const needKeywords = ['homeless','food insecurity','transport','no insurance','unemployed']
  for (const k of needKeywords){ if (lower.includes(k)) needs.push(k) }
  const riskKeywords = ['suicidal','suicide','plan','intent','imminent','homicidal','self-harm']
  for (const k of riskKeywords){ if (lower.includes(k)) risk.push(k) }
  return { dx, topics, modality, ageGroup, needs, risk }
}

function matchLibrary(extracted: any){
  const items = library as any[]
  const scored = items.map(item => {
    let score = 0
    if (extracted.dx.some((d:string)=> item.diagnoses.includes(d))) score += 10
    if (extracted.topics.some((t:string)=> item.topics.includes(t))) score += 6
    if (extracted.modality.some((m:string)=> item.modality.includes(m))) score += 3
    if (extracted.ageGroup && item.ageGroups.includes(extracted.ageGroup)) score += 2
    return { item, score }
  })
  scored.sort((a,b)=> b.score - a.score)
  return scored.slice(0,10).map(s=>({ slug: s.item.slug, title: s.item.title, why: `Matches: ${s.score} points` }))
}

function matchResources(location?: string, needs: string[] = []){
  const list = resources as any[]
  const locLower = (location||'').toLowerCase()
  const desiredCats: string[] = []
  if (needs.find(n=>n.includes('homeless'))) desiredCats.push('housing','crisis','benefits','food','transport')
  if (needs.find(n=>n.includes('food'))) desiredCats.push('food')
  if (needs.find(n=>n.includes('transport'))) desiredCats.push('transport')
  if (needs.find(n=>n.includes('insurance')) || needs.find(n=>n.includes('unemployed'))) desiredCats.push('benefits','legal')
  if (desiredCats.length === 0) desiredCats.push('housing','food','crisis')
  const scored = list.map(r=>{
    let score = r.priorityScore || 0
    if (desiredCats.includes(r.category)) score += 10
    const hit = [r.city, r.county, r.state].filter(Boolean).map((x:string)=>x.toLowerCase())
    if (locLower && hit.some(h=> locLower.includes(h))) score += 20
    if (!locLower && (r.state === 'AZ' || !r.state)) score += 5
    return { r, score }
  })
  scored.sort((a,b)=> b.score - a.score)
  return scored.slice(0,6).map(s=>s.r)
}

export async function POST(req: Request){
  const data = await req.json()
  const parsed = BodySchema.safeParse(data)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { narrative, location } = parsed.data
  const ex = extract(narrative)
  const items = matchLibrary(ex)
  const res = matchResources(location, ex.needs)
  const providerSummary = `Selected ${items.length} items based on diagnoses (${ex.dx.join(', ')}) and topics (${ex.topics.join(', ')}).`
  const patientSummary = `Here are some helpful handouts and steps for the next few weeks to support your goals.`
  const homework = [
    { week: 1, tasks: ['Read two handouts','Practice grounding daily','Call one resource if needed'] },
    { week: 2, tasks: ['Do one worksheet','Schedule one pleasant activity'] },
    { week: 3, tasks: ['Review progress','Try new skill (breathing/exposure)'] },
    { week: 4, tasks: ['Adjust plan with clinician','Continue supports'] },
  ]
  const warnings = ex.risk.length ? ['CRISIS WARNING: suicidal or imminent harm risk detected. Call 988 or local emergency services.'] : []
  const payload = {
    provider: { summary: providerSummary, items, warnings },
    patient: { summary: patientSummary, homework },
    resources: res
  }
  return NextResponse.json(payload)
}
