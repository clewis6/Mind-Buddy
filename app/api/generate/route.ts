import { NextResponse } from 'next/server'
import { z } from 'zod'
import { extractProfile } from '../../../lib/extractor'
import { matchResources } from '../../../lib/matcher'
import { generatePlan } from '../../../lib/generator'
import { getAiMode } from '../../../lib/aiService'

const BodySchema = z.object({ narrative: z.string().min(5), overrideLocation: z.string().optional(), setting: z.string().optional(), tone: z.string().optional() })

export async function POST(req: Request){
  const body = await req.json()
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { narrative, overrideLocation, setting, tone } = parsed.data

  const mode = getAiMode()

  const profile = extractProfile(narrative, overrideLocation)
  const resources = matchResources(profile)
  const plan = generatePlan(profile)

  const payload = {
    profile,
    providerPlan: plan.providerPlan,
    patientHandout: plan.patientHandout,
    resources,
    meta: { mode, generatedAt: new Date().toISOString() }
  }

  // risk check: if suicidal keywords present add warning
  if (profile.riskFlags.includes('suicide') || profile.riskFlags.includes('imminent')){
    payload.providerPlan.warnings = payload.providerPlan.warnings || []
    payload.providerPlan.warnings.push('CRISIS WARNING: suicidal or imminent harm risk detected. Call 988 or local emergency services.')
  }

  return NextResponse.json(payload)
}
