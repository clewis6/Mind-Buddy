import Link from 'next/link'

export default function NavBar(){
  return (
    <div className="no-print border-b bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700 transition">
          <img src="/brand/logo.svg" alt="Mind Buddy" className="h-6 w-auto" />
          <span>Mind Buddy</span>
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/library" className="hover:text-emerald-600 transition">Library</Link>
          <Link href="/packet" className="hover:text-sky-600 transition">Packet Builder</Link>
          <Link href="/about" className="hover:text-rose-600 transition">About</Link>
        </nav>
      </div>
    </div>
  )
}
