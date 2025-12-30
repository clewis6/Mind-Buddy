export type Location = { city?: string; state?: string; zip?: string }

export type StructuredClientProfile = {
  age?: string | number
  gender?: string
  location?: Location
  diagnoses: string[]
  socialNeeds: string[]
  riskFlags: string[]
  notes?: string
}

export type Resource = {
  name: string
  category: string
  // New location schema
  city?: string
  county?: string
  state?: string
  // Legacy optional coverage string retained for compatibility
  locationCoverage?: string
  phone: string
  website?: string
  address?: string
  eligibilityNotes?: string
  hoursNotes?: string
  priorityScore: number
}

export type GenerationResponse = {
  profile: StructuredClientProfile
  providerPlan: any
  patientHandout: any
  resources: Resource[]
  meta: { mode: 'mock'|'openai', generatedAt: string }
}

export type LibraryItem = {
  slug: string
  title: string
  type: 'handout'|'worksheet'|'skill'
  diagnoses: string[]
  topics: string[]
  modality: string[]
  ageGroups: string[]
  setting: string[]
  minutesToComplete: number
  summary: string
  content: string
}
