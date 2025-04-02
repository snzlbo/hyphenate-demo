import '@/styles/globals.css'
import '@/styles/prosemirror.css'
import 'katex/dist/katex.min.css'

import type { Metadata, Viewport } from 'next'
import { Suspense, type ReactNode } from 'react'
import Providers from './providers'
import { Header } from '@/components/reuseables/header'

const title = 'Hyphenated Words | Novel - Notion-style WYSIWYG editor'
const description =
  'HNW is a Notion-style WYSIWYG editor that allows you to write and publish articles with ease.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@snzlbo',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
