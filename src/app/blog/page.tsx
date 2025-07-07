import { client } from '@/lib/sanity'
import { postsQuery } from '@/lib/queries'
import { Post } from '@/types'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Link from 'next/link'
import Image from 'next/image'

// キャッシュを無効化して常に最新データを取得
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(postsQuery, {}, { 
      cache: 'no-store', // キャッシュを無効化
      next: { revalidate: 0 } // 常に最新データを取得
    })
    return posts || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-20">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-white mb-8">
          ブログ
        </h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-200 text-lg">
            まだ記事がありません。
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <article className="work-card overflow-hidden hover:shadow-lg transition-shadow">
                  {post.mainImage && (
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                      <Image 
                        src={`https://cdn.sanity.io/images/hrnqyow5/production/${post.mainImage.asset._ref.replace('image-', '').replace('-png', '.png').replace('-jpg', '.jpg').replace('-jpeg', '.jpeg')}`}
                        alt={post.mainImage.alt || post.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-gray-200 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-300">
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
      <Footer />
    </div>
  )
}
