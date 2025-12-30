import Link from 'next/link'

const categories = ['Anxiety','Depression','Trauma/PTSD','Bipolar','SUD','ADHD','Grief','Relationships']

export default function Home() {
  return (
    <main>
      <header className="py-14 text-center rounded-xl bg-gradient-to-r from-brand.sky.100 via-brand.emerald.100 to-brand.indigo.100 border">
  <h1 className="text-4xl font-semibold tracking-tight">Mind Buddy</h1>
        <p className="mt-3 text-gray-700">Professional, printable worksheets and handouts. Smart packet builder with local resources.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/library" className="inline-block bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-3 rounded-md shadow">Browse Library</Link>
          <Link href="/packet" className="inline-block bg-emerald-600 hover:bg-emerald-700 transition text-white px-5 py-3 rounded-md shadow">Build a Packet</Link>
        </div>
      </header>

      <div className="max-w-xl mx-auto">
        <input placeholder="Search the library" className="w-full p-3 border rounded" />
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {categories.map(c => (
          <Link key={c} href={`/library?category=${encodeURIComponent(c.toLowerCase())}`} className="block p-5 bg-white rounded-xl shadow hover:shadow-glow hover:scale-[1.01] transition text-center border">
            <div className="text-2xl">{c.includes('Anxiety')?'😌':c.includes('Depression')?'🌤️':c.includes('Trauma')?'🛡️':c.includes('Bipolar')?'🌓':c.includes('SUD')?'🌊':c.includes('ADHD')?'⚡':c.includes('Grief')?'🌱':'🤝'}</div>
            <div className="mt-1 font-medium">{c}</div>
            <div className="mt-2 text-xs text-gray-600">Explore {c.toLowerCase()} tools</div>
          </Link>
        ))}
      </section>
    </main>
  )
}
