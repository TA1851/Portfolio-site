import { client } from '@/lib/sanity'
import { Post, Tag } from '@/types'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { TagComponent } from '@/components/common/TagComponent'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface TagPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getTag(slug: string): Promise<Tag | null> {
  try {
    const tag = await client.fetch(`
      *[_type == "tag" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        description,
        color,
        "postCount": count(*[_type == "post" && references(^._id)])
      }
    `, { slug }, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    return tag
  } catch (error) {
    console.error('Error fetching tag:', error)
    return null
  }
}

async function getPostsByTag(tagId: string): Promise<Post[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "post" && references($tagId)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        image {
          asset->,
          alt
        },
        mainImage {
          asset->,
          alt
        },
        categories[]-> {
          title,
          slug,
          color
        },
        tags[]-> {
          name,
          slug,
          color
        },
        publishedAt,
        _createdAt,
        _updatedAt
      }
    `, { tagId }, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    return posts || []
  } catch (error) {
    console.error('Error fetching posts by tag:', error)
    return []
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTag(slug)
  
  if (!tag) {
    notFound()
  }

  const posts = await getPostsByTag(tag._id)

  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-20">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* ヘッダー */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <TagComponent tag={tag} size="lg" showCount />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {tag.name} の記事
                </h1>
                <p className="text-gray-300 mt-1">
                  {posts.length}件の記事があります
                </p>
              </div>
            </div>
            
            {tag.description && (
              <p className="text-gray-200 text-lg max-w-3xl">
                {tag.description}
              </p>
            )}
          </header>

          {/* ナビゲーション */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← すべての記事に戻る
            </Link>
          </div>

          {/* 記事一覧 */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-200 text-lg mb-4">
                このタグに関連する記事はまだありません。
              </p>
              <Link 
                href="/blog"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                すべての記事を見る
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`}>
                  <article className="work-card overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    {/* 画像エリア - 常に表示 */}
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      {(post.image || post.mainImage) ? (
                        (() => {
                          const imageData = post.image || post.mainImage;
                          
                          if (!imageData?.asset) {
                            return (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <div className="text-center">
                                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <span className="text-sm">画像なし</span>
                                </div>
                              </div>
                            );
                          }
                          
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
                            return (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <div className="text-center">
                                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <span className="text-sm">画像なし</span>
                                </div>
                              </div>
                            );
                          }
                        })()
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-sm">画像なし</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {post.excerpt && (
                        <p className="text-gray-200 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
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
        </div>
      </main>
      <Footer />
    </div>
  )
}

// 静的パス生成
export async function generateStaticParams() {
  try {
    const tags = await client.fetch(`
      *[_type == "tag"] {
        "slug": slug.current
      }
    `)
    
    return tags.map((tag: { slug: string }) => ({
      slug: tag.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// メタデータ生成
export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTag(slug)
  
  if (!tag) {
    return {
      title: 'タグが見つかりません',
      description: '指定されたタグは存在しません。'
    }
  }

  const posts = await getPostsByTag(tag._id)
  
  return {
    title: `${tag.name} の記事一覧`,
    description: tag.description || `${tag.name}に関連する記事一覧です。${posts.length}件の記事があります。`,
    openGraph: {
      title: `${tag.name} の記事一覧`,
      description: tag.description || `${tag.name}に関連する記事一覧です。`,
      type: 'website'
    }
  }
}
