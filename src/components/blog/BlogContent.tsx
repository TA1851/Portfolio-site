'use client'

import { useState, useEffect, useCallback } from 'react'
import { Post, Tag } from '@/types'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { CompactTagFilter } from '@/components/common/CompactTagFilter'
import { TagList } from '@/components/common/TagList'

interface BlogContentProps {
  initialPosts: Post[]
  initialTags: Tag[]
}

export function BlogContent({ initialPosts, initialTags }: BlogContentProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [allPosts] = useState<Post[]>(initialPosts)
  const [tags] = useState<Tag[]>(initialTags)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [loading] = useState(false)

  // タグフィルタリング
  const filterPosts = useCallback(() => {
    if (selectedTags.length === 0) {
      setPosts(allPosts)
      return
    }

    const filtered = allPosts.filter(post => {
      if (!post.tags || post.tags.length === 0) return false
      return post.tags.some(tag => selectedTags.includes(tag._id))
    })

    setPosts(filtered)
  }, [selectedTags, allPosts])

  useEffect(() => {
    filterPosts()
  }, [filterPosts])

  const handleTagsChange = (newSelectedTags: string[]) => {
    setSelectedTags(newSelectedTags)
  }

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">
          ブログ
        </h1>
        
        {/* コンパクトなタグフィルター */}
        <CompactTagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagsChangeAction={handleTagsChange}
        />
      </div>

      {/* フィルター状態の表示 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-200">
            {loading ? '読み込み中...' : `${posts.length}件の記事`}
            {selectedTags.length > 0 && (
              <span className="ml-2 text-sm">
                （{selectedTags.length}個のタグでフィルタ中）
              </span>
            )}
          </p>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              フィルターをクリア
            </button>
          )}
        </div>
        
        {/* 選択されたタグの表示 */}
        {selectedTags.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-2">選択中のタグ:</p>
            <TagList
              tags={tags.filter(tag => selectedTags.includes(tag._id))}
              variant="default"
              size="sm"
            />
          </div>
        )}
      </div>

      {/* 記事一覧 */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-200 text-lg mb-4">
            {selectedTags.length > 0 
              ? '選択されたタグに一致する記事が見つかりません。'
              : 'まだ記事がありません。'
            }
          </p>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              すべての記事を表示
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <article className="work-card overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                {(post.image || post.mainImage) && (
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                    {(() => {
                      const imageData = post.image || post.mainImage;
                      
                      if (!imageData?.asset) return null;
                      
                      try {
                        const imageUrl = urlFor(imageData)
                          .width(400)
                          .height(225)
                          .fit('crop')
                          .crop('center')
                          .url();
                        
                        return (
                          <Image 
                            src={imageUrl}
                            alt={imageData?.alt || post.title}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        );
                      } catch (error) {
                        console.error('Error building image URL:', error);
                        return null;
                      }
                    })()}
                  </div>
                )}
                
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-gray-200 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                  )}

                  {/* タグ表示 */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-4">
                      <TagList
                        tags={post.tags}
                        variant="subtle"
                        size="sm"
                        maxTags={3}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-300 mt-auto">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                    </span>
                    
                    {post.categories && post.categories.length > 0 && (
                      <span className="bg-blue-100/20 text-blue-200 px-2 py-1 rounded">
                        {post.categories[0].title}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
