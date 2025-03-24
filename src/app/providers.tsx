'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { type ReactNode, useEffect } from 'react'
import { Toaster } from 'sonner'

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: 'light' | 'dark' | 'system'
  }
  return <Toaster theme={theme} />
}

export default function Providers({ children }: { children: ReactNode }) {
  const { theme } = useTheme()
  useEffect(() => {
    console.log('theme', theme)
  }, [theme])
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <ToasterProvider />
      {children}
    </ThemeProvider>
  )
}
