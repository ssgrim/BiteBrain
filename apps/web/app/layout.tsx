import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DevBanner } from '../src/components/DevBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BiteBrain - AI Fishing Assistant',
  description: 'AI that fuses local weather, seasonal bite patterns, and your tackle inventory to recommend where/when/what to fish',
  icons: {
    icon: '/assets/icons/zombie-fish-badge.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DevBanner version="0.1.0-dev" />
        {children}
      </body>
    </html>
  )
}
