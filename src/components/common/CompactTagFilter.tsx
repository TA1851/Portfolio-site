'use client'

import { useState } from 'react'
import { Tag } from '@/types'
import { TagComponent } from './TagComponent'
import { ChevronDownIcon, SearchIcon, XIcon } from 'lucide-react'

interface CompactTagFilterProps {
  tags: Tag[]
  selectedTags: string[]
  onTagsChangeAction: (selectedTags: string[]) => void
  className?: string
}

export function CompactTagFilter({
  tags,
  selectedTags,
  onTagsChangeAction,
  className = ''
}: CompactTagFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // タグを投稿数順でソート
  const sortedTags = [...tags].sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
  
  // 検索でフィルタリング
  const filteredTags = sortedTags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTagClick = (tag: Tag) => {
    const tagId = tag._id
    const isSelected = selectedTags.includes(tagId)
    
    if (isSelected) {
      onTagsChangeAction(selectedTags.filter(id => id !== tagId))
    } else {
      onTagsChangeAction([...selectedTags, tagId])
    }
  }

  const clearAllTags = () => {
    onTagsChangeAction([])
  }

  const selectedTagsData = tags.filter(tag => selectedTags.includes(tag._id))

  return (
    <div className={`relative ${className}`}>
      {/* トリガーボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
        aria-label="タグフィルターを開く"
      >
        <SearchIcon size={16} />
        <span className="text-sm">
          {selectedTags.length > 0 ? `${selectedTags.length}個のタグ` : 'タグで絞り込み'}
        </span>
        <ChevronDownIcon 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* メニューコンテンツ */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
            <div className="p-4 space-y-3">
              {/* ヘッダー */}
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">タグでフィルター</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="フィルターを閉じる"
                >
                  <XIcon size={16} />
                </button>
              </div>

              {/* 検索ボックス */}
              <div className="relative">
                <SearchIcon 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  placeholder="タグを検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* 選択されたタグ */}
              {selectedTags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      選択中 ({selectedTags.length})
                    </span>
                    <button
                      onClick={clearAllTags}
                      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      すべてクリア
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedTagsData.map(tag => (
                      <TagComponent
                        key={tag._id}
                        tag={tag}
                        variant="default"
                        size="sm"
                        onClick={() => handleTagClick(tag)}
                        className="ring-1 ring-blue-500"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 利用可能なタグ */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  利用可能なタグ ({filteredTags.length})
                </span>
                
                <div className="max-h-48 overflow-y-auto">
                  {filteredTags.length === 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 py-2">
                      {searchTerm ? '検索条件に一致するタグが見つかりません。' : 'タグがありません。'}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {filteredTags.map(tag => (
                        <TagComponent
                          key={tag._id}
                          tag={tag}
                          variant={selectedTags.includes(tag._id) ? 'default' : 'outline'}
                          size="sm"
                          showCount
                          onClick={() => handleTagClick(tag)}
                          className={selectedTags.includes(tag._id) ? 'ring-1 ring-blue-500' : ''}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
