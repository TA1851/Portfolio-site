import { client } from '@/lib/sanity'
import { postQuery } from '@/lib/queries'
import { Post } from '@/types'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(postQuery, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span>
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </span>
              
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2">
                  {post.categories.map((category) => (
                    <span 
                      key={category.title}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {post.mainImage && (
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-8">
                <img 
                  src={`https://cdn.sanity.io/images/hrnqyow5/production/${post.mainImage.asset._ref.replace('image-', '').replace('-png', '.png').replace('-jpg', '.jpg').replace('-jpeg', '.jpeg')}`}
                  alt={post.mainImage.alt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.body} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
