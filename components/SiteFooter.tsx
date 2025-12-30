export default function SiteFooter(){
  return (
    <footer className="no-print mt-10 border-t bg-white/60">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 flex flex-wrap items-center justify-between gap-3">
  <div>© {new Date().getFullYear()} Mind Buddy</div>
        <div className="flex gap-4">
          <a className="hover:underline" href="/about">Disclaimer</a>
          <a className="hover:underline" href="/library">Library</a>
          <a className="hover:underline" href="/packet">Build a Packet</a>
        </div>
      </div>
    </footer>
  )
}
