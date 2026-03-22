import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Atlas — Navigate the AI Universe',
  description: 'The interactive map of the AI ecosystem. Discover, compare, and build AI workflows.',
  keywords: 'AI tools, AI directory, machine learning, artificial intelligence, AI stack',
  openGraph: {
    title: 'Atlas — Navigate the AI Universe',
    description: 'The interactive map of the AI ecosystem.',
    siteName: 'Atlas by AIAstralis',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="scan-lines" />
        {children}
      </body>
    </html>
  )
}
