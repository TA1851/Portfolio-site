'use client'

import { useState } from 'react'
import { Tag } from '@/types'
import { TagComponent } from './TagComponent'

interface TagFilterProps {
  tags: Tag[]
  selectedTags: string[]
  onTagsChangeAction: (selectedTags: string[]) => void
  className?: string
  maxDisplayTags?: number
  showAllButton?: boolean
}

export function TagFilter({
  tags,
  selectedTags,
  onTagsChangeAction,
  className = '',
  maxDisplayTags = 10,
  showAllButton = true
}: TagFilterProps) {
  const [showAll, setShowAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // タグを投稿数順でソート
  const sortedTags = [...tags].sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
  
  // 検索でフィルタリング
  const filteredTags = sortedTags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 表示するタグを決定
  const displayTags = showAll || searchTerm
    ? filteredTags
    : filteredTags.slice(0, maxDisplayTags)

  const handleTagClick = (tag: Tag) => {
    const tagId = tag._id
    const isSelected = selectedTags.includes(tagId)
    
    if (isSelected) {
      // タグを削除
      onTagsChangeAction(selectedTags.filter(id => id !== tagId))
    } else {
      // タグを追加
      onTagsChangeAction([...selectedTags, tagId])
    }
  }

  const clearAllTags = () => {
    onTagsChangeAction([])
  }

  const hasRemainingTags = !showAll && !searchTerm && filteredTags.length > maxDisplayTags

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 検索バー */}
      <div className="relative">
        <input
          type="text"
          placeholder="タグを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="検索をクリア"
          >
            ✕
          </button>
        )}
      </div>

      {/* 選択されたタグ */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              選択中のタグ ({selectedTags.length})
            </h4>
            <button
              onClick={clearAllTags}
              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              すべてクリア
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tagId => {
              const tag = tags.find(t => t._id === tagId)
              if (!tag) return null
              return (
                <TagComponent
                  key={tag._id}
                  tag={tag}
                  variant="default"
                  size="sm"
                  onClick={() => handleTagClick(tag)}
                  className="ring-2 ring-blue-500"
                />
              )
            })}
          </div>
        </div>
      )}

      {/* 利用可能なタグ */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          利用可能なタグ
          {filteredTags.length > 0 && (
            <span className="ml-1 text-gray-500">({filteredTags.length})</span>
          )}
        </h4>
        
        {filteredTags.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {searchTerm ? '検索条件に一致するタグが見つかりません。' : 'タグがありません。'}
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {displayTags.map(tag => (
                <TagComponent
                  key={tag._id}
                  tag={tag}
                  variant={selectedTags.includes(tag._id) ? 'default' : 'outline'}
                  size="sm"
                  showCount
                  onClick={() => handleTagClick(tag)}
                  className={selectedTags.includes(tag._id) ? 'ring-2 ring-blue-500' : ''}
                />
              ))}
            </div>
            
            {/* すべて表示ボタン */}
            {hasRemainingTags && showAllButton && (
              <button
                onClick={() => setShowAll(true)}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                すべてのタグを表示 (+{filteredTags.length - maxDisplayTags})
              </button>
            )}
            
            {/* 折りたたみボタン */}
            {showAll && showAllButton && (
              <button
                onClick={() => setShowAll(false)}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                タグを折りたたむ
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
