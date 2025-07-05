'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProviders({ children }: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  )
}
