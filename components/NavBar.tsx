import Link from 'next/link'

export default function NavBar(){
  return (
    <div className="no-print border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-blue-700">CarePlan Compass</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/library" className="hover:text-blue-700">Library</Link>
          <Link href="/packet" className="hover:text-blue-700">Packet Builder</Link>
          <Link href="/about" className="hover:text-blue-700">About</Link>
        </nav>
      </div>
    </div>
  )
}
