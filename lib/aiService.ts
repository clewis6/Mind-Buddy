import fs from 'fs'

export function getAiMode(): 'mock'|'openai' {
  return process.env.OPENAI_API_KEY ? 'openai' : 'mock'
}

// In mock mode we return deterministic text. In openai mode we would call OpenAI (not implemented here).
export async function callAI(prompt: string, mode?: 'mock'|'openai'){
  const m = mode || getAiMode()
  if (m === 'mock'){
    // simple deterministic echo with short advice
    return `MOCK RESPONSE:\nBased on the profile: ${prompt.slice(0,200)}...`
  }
  // OpenAI integration placeholder
  throw new Error('OpenAI mode not implemented in this MVP. Set OPENAI_API_KEY to enable.')
}
