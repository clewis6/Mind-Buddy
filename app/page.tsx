import Link from 'next/link'

const categories = ['Anxiety','Depression','Trauma/PTSD','Bipolar','SUD','ADHD','Grief','Relationships']

export default function Home() {
  return (
    <main>
      <header className="py-14 text-center rounded-xl bg-gradient-to-r from-blue-50 via-emerald-50 to-indigo-50 border">
        <h1 className="text-4xl font-semibold tracking-tight">CarePlan Compass</h1>
        <p className="mt-3 text-gray-700">Professional, printable worksheets and handouts. Smart packet builder with local resources.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/library" className="inline-block bg-blue-600 text-white px-5 py-3 rounded-md">Browse Library</Link>
          <Link href="/packet" className="inline-block bg-emerald-600 text-white px-5 py-3 rounded-md">Build a Packet</Link>
        </div>
      </header>

      <div className="max-w-xl mx-auto">
        <input placeholder="Search the library" className="w-full p-3 border rounded" />
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {categories.map(c => (
          <Link key={c} href={`/library?category=${encodeURIComponent(c.toLowerCase())}`} className="block p-5 bg-white rounded shadow text-center hover:border-blue-300 border">
            <div className="text-2xl">{c.includes('Anxiety')?'😌':c.includes('Depression')?'🌤️':c.includes('Trauma')?'🛡️':c.includes('Bipolar')?'🌓':c.includes('SUD')?'🌊':c.includes('ADHD')?'⚡':c.includes('Grief')?'🌱':'🤝'}</div>
            <div className="mt-1 font-medium">{c}</div>
          </Link>
        ))}
      </section>
    </main>
  )
}
