import { StructuredClientProfile } from './types'

const diagnosesList = ['depression','anxiety','ptsd','trauma','bipolar','substance use','sud','s u d','schizophrenia']
const socialNeedsList = ['homeless','food','transport','no insurance','unemployed','no family support','domestic violence','dv','limited mobility']
const riskList = ['suicide','suicidal','self-harm','homicidal','plan','intent','weapon','imminent']

export function extractProfile(narrative: string, overrideLocation?: string): StructuredClientProfile{
  const lower = narrative.toLowerCase()
  const profile: StructuredClientProfile = { diagnoses: [], socialNeeds: [], riskFlags: [] }

  // age
  const ageMatch = narrative.match(/(\d{1,3})[- ]?year[- ]old|\bteenager\b|\bteen\b|\bchild\b|\belderly\b/gi)
  if (ageMatch && ageMatch[0]){
    profile.age = ageMatch[0]
  }

  // gender
  if (/\bfemale\b|\bwoman\b/.test(lower)) profile.gender = 'female'
  if (/\bmale\b|\bman\b/.test(lower)) profile.gender = 'male'

  // location
  if (overrideLocation) {
    profile.location = { city: overrideLocation }
  } else {
    const locMatch = narrative.match(/([A-Za-z ]+),?\s*(AZ|Arizona|CA|California|NY|New York|TX|Texas|FL|Florida)\b/i)
    if (locMatch) profile.location = { city: locMatch[1].trim(), state: locMatch[2].replace('.', '') }
    const zip = narrative.match(/\b\d{5}\b/)
    if (zip) profile.location = { ...(profile.location||{}), zip: zip[0] }
  }

  // diagnoses
  for (const d of diagnosesList){ if (lower.includes(d)) profile.diagnoses.push(d) }

  // social needs
  for (const s of socialNeedsList){ if (lower.includes(s)) profile.socialNeeds.push(s) }

  // risk
  for (const r of riskList){ if (lower.includes(r)) profile.riskFlags.push(r) }

  profile.notes = narrative
  return profile
}
