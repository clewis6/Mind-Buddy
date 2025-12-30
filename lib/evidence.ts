export type Reference = {
  title: string
  authors?: string
  year?: string
  source?: string
  doi?: string
  link?: string
}

export type Evidence = {
  slug: string
  summary: string
  bullets: string[]
  references: Reference[]
}

const bySlug: Record<string, Evidence> = {
  'anxiety-panic-cycle': {
    slug: 'anxiety-panic-cycle',
    summary:
      'Gradual exposure with response prevention reduces threat expectancy and avoidance, leading to long-term panic reduction.',
    bullets: [
      'Avoidance maintains anxiety via negative reinforcement.',
      'Facing feared sensations/situations updates threat predictions (inhibitory learning).',
      'Paced breathing can help tolerate initial arousal during exposure practice.'
    ],
    references: [
      {
        title: 'Treating Panic Disorder: Cognitive-Behavioral Therapy',
        authors: 'D. H. Barlow & M. G. Craske',
        year: '2007',
        source: 'Oxford University Press'
      },
      {
        title: 'Inhibitory learning approaches to exposure therapy',
        authors: 'M. G. Craske et al.',
        year: '2014',
        source: 'Behaviour Research and Therapy',
        doi: '10.1016/j.brat.2014.10.006'
      },
      {
        title: 'Prolonged Exposure Therapy for PTSD (principles applicable to panic/exposure)',
        authors: 'E. B. Foa et al.',
        year: '2019',
        source: 'Oxford University Press'
      }
    ]
  },
  'anxiety-grounding-5-4-3-2-1': {
    slug: 'anxiety-grounding-5-4-3-2-1',
    summary:
      'Grounding and mindfulness-of-senses reduce cognitive/emotional reactivity by anchoring attention to present-moment stimuli.',
    bullets: [
      'Attentional redeployment shifts focus from worry/rumination to sensory input.',
      'Mindfulness practices show moderate reductions in anxiety and stress across settings.'
    ],
    references: [
      {
        title: 'Mindfulness-based therapy: A comprehensive meta-analysis',
        authors: 'B. Khoury et al.',
        year: '2013',
        source: 'Clinical Psychology Review',
        doi: '10.1016/j.cpr.2013.05.009'
      },
      {
        title: 'DBT Skills Training Manual (grounding/distress tolerance)',
        authors: 'M. M. Linehan',
        year: '2014',
        source: 'Guilford Press'
      }
    ]
  },
  'depression-behavioral-activation': {
    slug: 'depression-behavioral-activation',
    summary:
      'Behavioral Activation increases contact with rewarding and values-based activities, improving mood and functioning.',
    bullets: [
      'Activity scheduling and mastery/pleasure tasks show efficacy comparable to full CBT for depression.',
      'Small, consistent actions build momentum and reduce avoidance.'
    ],
    references: [
      {
        title: 'Behavioral Activation for Depression: A Clinician’s Guide',
        authors: 'C. W. Lejuez, J. R. Hopko, P. R. Hopko',
        year: '2001',
        source: 'Clinical Psychology: Science and Practice'
      },
      {
        title: 'Behavioral activation treatments for depression: A meta-analysis',
        authors: 'P. Cuijpers et al.',
        year: '2007',
        source: 'Clinical Psychology Review',
        doi: '10.1016/j.cpr.2007.01.006'
      },
      {
        title: 'Behavioral activation vs. cognitive therapy for depression',
        authors: 'N. S. Jacobson et al.',
        year: '1996',
        source: 'Journal of Consulting and Clinical Psychology',
        doi: '10.1037/0022-006X.64.2.295'
      }
    ]
  },
  'sud-urge-surfing': {
    slug: 'sud-urge-surfing',
    summary:
      'Urge surfing (mindful awareness of cravings) reduces reactivity and supports relapse prevention.',
    bullets: [
      'Observing urges as transient sensations weakens automaticity of use.',
      'Mindfulness-based relapse prevention decreases substance use and craving intensity.'
    ],
    references: [
      {
        title: 'Mindfulness-Based Relapse Prevention for Addictive Behaviors',
        authors: 'S. Bowen, N. Chawla, G. A. Marlatt',
        year: '2010',
        source: 'Guilford Press'
      },
      {
        title: 'Mindfulness-based relapse prevention for substance use disorders: A randomized clinical trial',
        authors: 'S. Bowen et al.',
        year: '2014',
        source: 'JAMA Psychiatry',
        doi: '10.1001/jamapsychiatry.2014.464'
      }
    ]
  }
}

export function getEvidence(slug: string): Evidence | null {
  return bySlug[slug] ?? null
}
