'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // デバッグログ
  useEffect(() => {
    console.log('Theme:', theme, 'Resolved:', resolvedTheme)
  }, [theme, resolvedTheme])

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    )
  }

  const toggleTheme = () => {
    console.log('Current theme before toggle:', theme)
    console.log('Current resolvedTheme:', resolvedTheme)
    
    switch (theme) {
      case 'light':
        console.log('Switching to dark')
        setTheme('dark')
        break
      case 'dark':
        console.log('Switching to light')
        setTheme('light')
        break
      case 'system':
        // システムテーマの場合は、現在の解決済みテーマに基づいて切り替え
        if (resolvedTheme === 'dark') {
          console.log('Switching from system (dark) to light')
          setTheme('light')
        } else {
          console.log('Switching from system (light) to dark')
          setTheme('dark')
        }
        break
      default:
        console.log('Setting to light as default')
        setTheme('light')
        break
    }
  }

  const getIcon = () => {
    const currentTheme = resolvedTheme || 'light'
    console.log('Displaying icon for theme:', currentTheme)
    
    switch (currentTheme) {
      case 'dark':
        return <MoonIcon className="h-5 w-5" />
      case 'light':
        return <SunIcon className="h-5 w-5" />
      default:
        return <SunIcon className="h-5 w-5" />
    }
  }

  const getTooltip = () => {
    const currentTheme = resolvedTheme || 'light'
    switch (currentTheme) {
      case 'dark':
        return 'ダークモード（クリックでライトモードに切り替え）'
      case 'light':
        return 'ライトモード（クリックでダークモードに切り替え）'
      default:
        return 'テーマ切り替え'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      {getIcon()}
    </button>
  )
}
