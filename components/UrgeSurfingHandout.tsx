"use client"
import { forwardRef } from 'react'
import { LibraryItem } from '../lib/types'
import { getEvidence } from '../lib/evidence'

export default forwardRef<HTMLDivElement, { item: LibraryItem }>(function UrgeSurfingHandout({ item }, ref){
  const ev = getEvidence(item.slug)
  return (
    <div ref={ref||null} className="handout bg-white rounded shadow">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-sky-100 via-indigo-100 to-fuchsia-100">
        <h1>🌊 Urge Surfing</h1>
        <p className="text-sm italic text-gray-700">Ride the Wave — Don’t Fight the Ocean</p>
      </div>

      <div className="p-6 grid gap-4">
        {/* What is urge surfing */}
        <div className="section">
          <div className="section-title">🧠 What Is Urge Surfing?</div>
          <div className="section-body grid gap-2">
            <p className="text-sm">An urge is a strong impulse to do something — use a substance, self-harm, lash out, binge, avoid, text someone you shouldn’t, etc.</p>
            <div>
              <div className="font-medium">Urge surfing is a skill that helps you:</div>
              <ul className="list-disc list-inside text-sm">
                <li>Notice the urge</li>
                <li>Stay present with it</li>
                <li>Ride it out</li>
                <li>Let it pass without acting on it</li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Think of urges like waves:</div>
              <ul className="list-disc list-inside text-sm">
                <li>They rise</li>
                <li>They peak</li>
                <li>They fall</li>
              </ul>
              <p className="text-sm mt-1">You don’t have to stop the wave. You just have to stay on the board long enough.</p>
            </div>
          </div>
        </div>

        {/* Why this matters */}
        <div className="section section--why">
          <div className="section-title">⚠️ The Panic / Urge Cycle (Why This Matters)</div>
          <div className="section-body text-sm">
            <ol className="list-decimal list-inside space-y-1">
              <li>The urge shows up</li>
              <li>We panic or judge ourselves</li>
              <li>We try to suppress or escape it</li>
              <li>The urge gets stronger</li>
              <li>We act on it → short-term relief</li>
              <li>Long-term consequences</li>
              <li>The cycle repeats</li>
            </ol>
            <p className="mt-2">Urge surfing breaks the cycle by teaching your brain: <span className="italic">“I can feel this without acting on it.”</span></p>
          </div>
        </div>

        {/* Wave breakdown */}
        <div className="section">
          <div className="section-title">🌊 The Wave Breakdown</div>
          <div className="section-body grid gap-2 text-sm">
            <p>Urges usually last 20–45 minutes if you don’t feed them. Every urge has 3 phases:</p>
            <div className="grid md:grid-cols-3 gap-2">
              <div className="border rounded p-2 print:border-black">
                <div className="font-medium">1️⃣ The Rise</div>
                <ul className="list-disc list-inside">
                  <li>Thoughts start looping</li>
                  <li>Body sensations increase</li>
                  <li>Emotions intensify</li>
                </ul>
                <div className="text-xs text-gray-600 mt-1">👉 This is where most people panic.</div>
              </div>
              <div className="border rounded p-2 print:border-black">
                <div className="font-medium">2️⃣ The Peak</div>
                <ul className="list-disc list-inside">
                  <li>The urge feels urgent</li>
                  <li>Your brain says “I HAVE to do this”</li>
                </ul>
                <div className="text-xs text-gray-600 mt-1">👉 This is the hardest part — and the shortest.</div>
              </div>
              <div className="border rounded p-2 print:border-black">
                <div className="font-medium">3️⃣ The Fall</div>
                <ul className="list-disc list-inside">
                  <li>Intensity slowly decreases</li>
                  <li>Thoughts loosen</li>
                  <li>Body calms</li>
                </ul>
                <div className="text-xs text-gray-600 mt-1">👉 This happens whether you act on the urge or not.</div>
              </div>
            </div>
          </div>
        </div>

        {/* How to urge surf */}
        <div className="section">
          <div className="section-title">🏄‍♀️ How to Urge Surf (Step-by-Step)</div>
          <div className="section-body grid gap-3 text-sm">
            <div>
              <div className="font-medium">🧭 Step 1: Name the Wave</div>
              <p>Silently or out loud, say:</p>
              <ul className="list-disc list-inside">
                <li>“I’m having an urge to ______.”</li>
                <li>“This is an urge, not a command.”</li>
              </ul>
              <p>Naming it creates distance.</p>
            </div>

            <div>
              <div className="font-medium">👀 Step 2: Observe Without Judgment</div>
              <p>Pretend you’re a scientist, not a critic. Ask yourself:</p>
              <ul className="list-disc list-inside">
                <li>Where do I feel this in my body?</li>
                <li>Is it tight? Hot? Heavy? Restless?</li>
                <li>What thoughts are showing up?</li>
              </ul>
              <p className="text-xs text-gray-600">⚠️ No fixing. No arguing. Just noticing.</p>
            </div>

            <div>
              <div className="font-medium">🌬️ Step 3: Breathe Like You’re on a Board</div>
              <p>Try this rhythm:</p>
              <ul className="list-disc list-inside">
                <li>Inhale 4 seconds</li>
                <li>Exhale 6 seconds</li>
              </ul>
              <p>Longer exhales tell your nervous system: <span className="italic">“We are not in danger.”</span></p>
            </div>

            <div>
              <div className="font-medium">🏄 Step 4: Ride It</div>
              <p>Picture yourself on a surfboard:</p>
              <ul className="list-disc list-inside">
                <li>The wave is uncomfortable but temporary</li>
                <li>You don’t dive into it</li>
                <li>You don’t fight it</li>
                <li>You let it move under you</li>
              </ul>
              <ul className="list-disc list-inside mt-1">
                <li>“This will peak.”</li>
                <li>“This will pass.”</li>
                <li>“I don’t have to decide anything right now.”</li>
              </ul>
            </div>

            <div>
              <div className="font-medium">🌅 Step 5: Let It Fall</div>
              <p>When the urge fades:</p>
              <ul className="list-disc list-inside">
                <li>Acknowledge it: “I rode that.”</li>
                <li>Even if it didn’t fully disappear — you weakened it</li>
              </ul>
              <p>Every time you don’t act: 🧠 Your brain learns • 💪 Your tolerance grows • 🌊 Future waves get smaller</p>
            </div>
          </div>
        </div>

        {/* Myths */}
        <div className="section">
          <div className="section-title">🔄 Common Myths</div>
          <div className="section-body grid md:grid-cols-3 gap-2 text-sm">
            <div className="border rounded p-2 print:border-black">
              <div className="font-medium">❌ “If I ignore it, it’ll explode”</div>
              <div>✅ Urges naturally fall when not fed</div>
            </div>
            <div className="border rounded p-2 print:border-black">
              <div className="font-medium">❌ “If I feel this, I’ve failed”</div>
              <div>✅ Urges are a sign you’re healing, not failing</div>
            </div>
            <div className="border rounded p-2 print:border-black">
              <div className="font-medium">❌ “I should distract immediately”</div>
              <div>✅ Distraction can help after you’ve observed the urge</div>
            </div>
          </div>
        </div>

        {/* Extra tools */}
        <div className="section">
          <div className="section-title">🛠️ Extra Surf Tools (If the Wave Is Big)</div>
          <div className="section-body text-sm">
            <ul className="list-disc list-inside">
              <li>Hold ice or splash cold water</li>
              <li>Walk slowly and name 5 things you see</li>
              <li>Stretch or pace</li>
              <li>Music with a steady beat</li>
              <li>Text someone safe after the peak passes</li>
            </ul>
          </div>
        </div>

        {/* Practice plan */}
        <div className="section section--homework">
          <div className="section-title">📝 Practice Plan</div>
          <div className="section-body grid gap-3 text-sm">
            <div>
              <div className="font-medium">Today</div>
              <div className="flex flex-col gap-1 mt-1">
                <label className="inline-flex items-center gap-2"><input type="checkbox" className="border"/> Read this handout</label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" className="border"/> Practice urge surfing once (even for a small urge)</label>
              </div>
            </div>
            <div>
              <div className="font-medium">Daily (5–10 minutes)</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-1">
                {['Notice one urge','Name it','Observe it','Breathe','Ride it'].map((t,i)=> (
                  <label key={i} className="inline-flex items-center gap-2"><input type="checkbox" className="border"/> {t}</label>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium">Track</div>
              <div className="grid md:grid-cols-2 gap-2 mt-1">
                <label className="block">What urge showed up?
                  <input className="mt-1 w-full border rounded p-2 print:border-black" />
                </label>
                <label className="block">How intense was it (0–10)?
                  <input className="mt-1 w-full border rounded p-2 print:border-black" />
                </label>
                <label className="block md:col-span-2">What helped?
                  <textarea className="mt-1 w-full border rounded p-2 h-20 print:border-black"/>
                </label>
                <label className="block md:col-span-2">What would I try differently next time?
                  <textarea className="mt-1 w-full border rounded p-2 h-20 print:border-black"/>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence */}
        {ev && (
          <div className="text-xs text-gray-600">
            <div className="font-semibold mb-1">Evidence & Why it works</div>
            <p className="mb-2">{ev.summary}</p>
            <ul className="list-disc list-inside mb-2">
              {ev.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
            </ul>
            <div className="font-semibold">References</div>
            <ul className="list-disc list-inside">
              {ev.references.map((r,i)=>(
                <li key={i}>
                  {r.authors ? r.authors+ ' ' : ''}({r.year}). {r.title}{r.source ? `. ${r.source}`:''}{r.doi?`. doi:${r.doi}`:''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reminder and footer */}
        <div className="text-sm bg-gradient-to-r from-sky-50 to-indigo-50 border rounded p-3 print:border-black">
          <div className="font-medium">💬 Reminder</div>
          <p>You are not weak for having urges. You are strong for staying present with them.</p>
          <p className="mt-1">You don’t have to stop the wave. You just have to stay on the board. 🌊</p>
        </div>

        <div className="text-xs text-gray-500">Educational support only • Not medical advice</div>
      </div>
    </div>
  )
})
