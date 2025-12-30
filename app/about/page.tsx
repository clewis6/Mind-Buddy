export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">About CarePlan Compass</h1>
      <p className="mt-3 text-gray-700">CarePlan Compass is a clinician decision-support tool that generates a problem list, goals, interventions, and a simple patient handout plus local resources based on a short narrative. This is not medical advice.</p>
      <h2 className="mt-4 font-semibold">How it works</h2>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        <li>Rule-based extractor detects age, location, diagnoses, risk, and needs.</li>
        <li>Templates generate clinician plans which are personalized to the client's context.</li>
        <li>Local resources are matched from a small seeded dataset.</li>
      </ul>
    </div>
  )
}
