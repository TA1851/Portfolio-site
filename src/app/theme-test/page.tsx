'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeTest() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Theme Test Page</h1>
      
      <div className="space-y-4">
        <p>Current theme: {theme}</p>
        <p>Resolved theme: {resolvedTheme}</p>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setTheme('light')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            System
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <p>This box should change color based on the theme.</p>
        </div>
      </div>
    </div>
  )
}
