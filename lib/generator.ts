import { StructuredClientProfile, GenerationResponse } from './types'

const templates: Record<string, any> = {
  depression: {
    problems: ['Low mood and anhedonia','Functional impairment','Hopelessness or low energy'],
    goals: ['Improve mood and activity','Increase social connection','Reduce suicidal ideation if present'],
    interventions: ['Behavioral activation','CBT for negative thoughts','Activity scheduling','Problem-solving therapy','Safety planning if risk present','Motivational interviewing'],
    tools: [
      { title: 'Activity Schedule', why: 'Increase pleasant activities', steps: ['List activities','Schedule 10-20 minutes daily','Review progress'] },
      { title: 'Thought Record', why: 'Track and challenge negative thoughts', steps: ['Identify situation','Record thoughts','Evaluate evidence','Generate alternative thought'] }
    ],
    sessions: [
      { session: 1, focus: 'Engagement, assessment, activity review' },
      { session: 2, focus: 'Introduce behavioral activation, set activity goals' },
      { session: 3, focus: 'Begin CBT techniques and problem solving' }
    ]
  },
  anxiety: {
    problems: ['Excessive worry','Avoidance behaviors','Physical anxiety symptoms'],
    goals: ['Reduce worry frequency','Increase tolerance to uncertainty','Improve functioning'],
    interventions: ['Psychoeducation','CBT for worry','Exposure and response prevention','Relaxation training','Mindfulness-based strategies'],
    tools: [ { title: 'Worry Time', why: 'Contain rumination', steps: ['Schedule 15-min worry time','Note worries and postpone until scheduled time'] } ],
    sessions: [ { session:1, focus:'Assessment and psychoeducation' }, { session:2, focus:'Coping skills' }, { session:3, focus:'Exposure planning' } ]
  },
  ptsd: {
    problems: ['Trauma re-experiencing','Avoidance','Hyperarousal'],
    goals: ['Reduce re-experiencing','Process trauma safely','Improve coping'],
    interventions: ['Trauma-focused CBT','PE-informed grounding','Pacing and stabilization','Safety planning','Psychoeducation'],
    tools: [ { title: 'Grounding Exercise', why:'Manage flashbacks', steps:['5 senses list','Slow breathing'] } ],
    sessions: [ { session:1, focus:'Stabilization and safety' }, { session:2, focus:'Psychoeducation' }, { session:3, focus:'Introduce grounding' } ]
  },
  'substance use': {
    problems: ['Unhealthy substance use','Risk of withdrawal or harm','Impaired functioning'],
    goals: ['Reduce use','Engage in support services','Manage cravings'],
    interventions: ['Motivational interviewing','Relapse prevention','Contingency planning','Harm reduction strategies','Referral to treatment'],
    tools: [ { title: 'Craving Plan', why:'Manage urges', steps:['Identify triggers','Use coping plan','Delay and distract'] } ],
    sessions: [ { session:1, focus:'Engagement and MI' }, { session:2, focus:'Relapse prevention' }, { session:3, focus:'Harm reduction and referrals' } ]
  },
  bipolar: {
    problems: ['Mood lability','Risky behavior during mania','Depressive episodes'],
    goals: ['Stabilize mood','Improve routine','Reduce risky behaviors'],
    interventions: ['Psychoeducation','Mood charting','CBT for bipolar','Sleep stabilization','Safety planning'],
    tools: [ { title: 'Mood Chart', why:'Track episodes', steps:['Daily mood rating','Medication adherence notes'] } ],
    sessions: [ { session:1, focus:'Psychoeducation and safety' }, { session:2, focus:'Mood charting' }, { session:3, focus:'Intervention planning' } ]
  }
}

function pickTemplate(diagnoses: string[]){
  for (const d of diagnoses){
    const key = d.toLowerCase()
    if (templates[key]) return templates[key]
    if (key.includes('ptsd') || key.includes('trauma')) return templates['ptsd']
    if (key.includes('substance')) return templates['substance use']
  }
  // default
  return templates['depression']
}

export function generatePlan(profile: StructuredClientProfile){
  const tpl = pickTemplate(profile.diagnoses)

  // personalize
  const providerPlan = {
    summary: `Primary concerns: ${tpl.problems.join('; ')}. Social needs: ${profile.socialNeeds.join(', ')}`,
    problems: tpl.problems,
    goals: tpl.goals,
    objectives: tpl.goals.map((g:string)=>`By 4 weeks: ${g}`),
    interventions: tpl.interventions,
    sessionPlan: tpl.sessions,
    tools: tpl.tools,
    warnings: [] as string[]
  }

  const patientHandout = {
    plainSummary: `You are experiencing: ${tpl.problems.slice(0,2).join(' and ')}. Priority steps: connect with support, focus on small daily activities, and seek immediate help if you feel unsafe.`,
    nextSteps: ['Attend next appointment','Begin activity schedule','Contact local resources as needed'],
    callScripts: [],
    tools: tpl.tools.map((t:any)=>({ title: t.title, howTo: t.steps.join(' -> ') })),
    resources: []
  }

  // personalize for homelessness or mobility issues
  if (profile.socialNeeds.map(s=>s.toLowerCase()).includes('homeless')){
    providerPlan.interventions.unshift('Linkage to housing and benefits services')
    patientHandout.nextSteps.unshift('Contact local housing services')
  }

  if (profile.age && typeof profile.age === 'string' && profile.age.includes('elderly')){
    providerPlan.interventions.push('Assess falls risk and mobility supports')
    patientHandout.nextSteps.push('Arrange transport assistance')
  }

  return { providerPlan, patientHandout }
}
