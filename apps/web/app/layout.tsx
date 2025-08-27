import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DevBanner } from '../src/components/DevBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BiteBrain - AI Fishing Assistant',
  description: 'AI that fuses local weather, seasonal bite patterns, and your tackle inventory to recommend where/when/what to fish',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-lake-light dark:bg-lake-dark bg-cover bg-center bg-fixed`}>
        <DevBanner version="0.1.0-dev" />
        <div className="min-h-screen bg-bitebrain-mist/90 dark:bg-bitebrain-navy/90">
          {children}
        </div>
      </body>
    </html>
  )
}
