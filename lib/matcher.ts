import { Resource, StructuredClientProfile } from './types'
import resources from '../data/resources.json'

function normalize(s?: string){ return (s||'').toLowerCase().replace(/\s+/g,' ').trim() }

export function matchResources(profile: StructuredClientProfile): Resource[]{
  const desiredCats: string[] = []
  const needs = profile.socialNeeds.map(n=>n.toLowerCase())
  if (needs.includes('homeless')) desiredCats.push('housing','crisis','benefits','food','transport')
  if (needs.includes('food')) desiredCats.push('food')
  if (needs.includes('transport')) desiredCats.push('transport')
  if (needs.includes('no insurance') || needs.includes('unemployed')) desiredCats.push('benefits','legal')

  // fallback to all
  if (desiredCats.length === 0) desiredCats.push('housing','food','crisis','transport','benefits')

  const loc = profile.location?.city ? normalize(profile.location.city) : profile.location?.state ? normalize(profile.location.state) : ''

  // score resources
  const scored = (resources as Resource[]).map((r: Resource) => {
    let score = r.priorityScore || 0
    const catMatch = desiredCats.includes(r.category)
    if (catMatch) score += 10
    const coverage = normalize(
      r.locationCoverage ||
      [r.city, r.county, r.state].filter(Boolean).join(',') ||
      (r.state ? `${r.state}` : '')
    )
    if (loc && coverage.includes(loc)) score += 20
    if (coverage.includes('statewide') || coverage.includes('national')) score += 5
    return { r, score }
  })

  scored.sort((a,b)=>b.score - a.score)
  return scored.map(s=>s.r).slice(0,10)
}
