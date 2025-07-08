'use client'

import { Tag } from '@/types'
import { TagComponent } from './TagComponent'

interface TagListProps {
  tags: Tag[]
  variant?: 'default' | 'outline' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  maxTags?: number
  className?: string
  onTagClick?: (tag: Tag) => void
}

export function TagList({
  tags,
  variant = 'default',
  size = 'sm',
  showCount = false,
  maxTags,
  className = '',
  onTagClick
}: TagListProps) {
  if (!tags || tags.length === 0) {
    return null
  }

  const displayTags = maxTags ? tags.slice(0, maxTags) : tags
  const remainingCount = maxTags && tags.length > maxTags ? tags.length - maxTags : 0

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tag) => (
        <TagComponent
          key={tag._id}
          tag={tag}
          variant={variant}
          size={size}
          showCount={showCount}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
        />
      ))}
      {remainingCount > 0 && (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          +{remainingCount}個のタグ
        </span>
      )}
    </div>
  )
}
