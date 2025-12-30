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
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <NavBar />
        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
