import './globals.css'
import { ReactNode } from 'react'
import NavBar from '../components/NavBar'
import SiteFooter from '../components/SiteFooter'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mind Buddy',
  description: 'Generate treatment plans, handouts, and local resources from clinical narratives.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} text-gray-900 bg-brand-hero`}>
        <NavBar />
        <main className="max-w-6xl mx-auto p-6">
          <div className="rounded-2xl bg-white/80 backdrop-blur shadow-glow border border-white/40">
            <div className="p-6">
          {children}
            </div>
          </div>
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
