'use client'

import Link from 'next/link'
import { Tag } from '@/types'

interface TagComponentProps {
  tag: Tag
  variant?: 'default' | 'outline' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
  onClick?: () => void
}

const colorClasses = {
  blue: {
    default: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300',
    outline: 'border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400',
    subtle: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
  },
  green: {
    default: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300',
    outline: 'border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400',
    subtle: 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300'
  },
  red: {
    default: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300',
    outline: 'border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400',
    subtle: 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
  },
  yellow: {
    default: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300',
    outline: 'border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-400',
    subtle: 'text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300'
  },
  purple: {
    default: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300',
    outline: 'border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400',
    subtle: 'text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300'
  },
  pink: {
    default: 'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-300',
    outline: 'border-pink-300 text-pink-700 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-400',
    subtle: 'text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300'
  },
  gray: {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300',
    outline: 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400',
    subtle: 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300'
  }
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
}

export function TagComponent({
  tag,
  variant = 'default',
  size = 'md',
  showCount = false,
  className = '',
  onClick
}: TagComponentProps) {
  const color = tag.color || 'gray'
  const colorClass = colorClasses[color as keyof typeof colorClasses]?.[variant] || colorClasses.gray[variant]
  const sizeClass = sizeClasses[size]
  
  const baseClasses = `
    inline-flex items-center gap-1 rounded-full font-medium transition-colors duration-200
    ${variant === 'outline' ? 'border' : ''}
    ${sizeClass}
    ${colorClass}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const content = (
    <>
      <span className="flex items-center gap-1">
        <span>#</span>
        <span>{tag.name}</span>
      </span>
      {showCount && tag.postCount !== undefined && (
        <span className="opacity-75">({tag.postCount})</span>
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} cursor-pointer hover:scale-105`}
        type="button"
        aria-label={`タグ「${tag.name}」でフィルタリング`}
      >
        {content}
      </button>
    )
  }

  return (
    <Link
      href={`/blog/tag/${tag.slug.current}`}
      className={`${baseClasses} hover:scale-105`}
      aria-label={`タグ「${tag.name}」の記事一覧`}
    >
      {content}
    </Link>
  )
}
