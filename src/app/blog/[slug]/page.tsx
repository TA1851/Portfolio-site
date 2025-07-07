import { client } from '@/lib/sanity'
import { postQuery } from '@/lib/queries'
import { Post } from '@/types'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

// キャッシュを無効化して常に最新データを取得
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(postQuery, { slug }, { 
      cache: 'no-store', // キャッシュを無効化
      next: { revalidate: 0 } // 常に最新データを取得
    })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-20">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
              <span>
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </span>
              
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2">
                  {post.categories.map((category) => (
                    <span 
                      key={category.title}
                      className="bg-blue-100/20 text-blue-200 px-2 py-1 rounded text-xs"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {(post.image || post.mainImage) && (
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-8">
                {(() => {
                  const imageData = post.image || post.mainImage;
                  
                  if (!imageData?.asset) return null;
                  
                  try {
                    const imageUrl = urlFor(imageData)
                      .width(800)
                      .height(450)
                      .fit('crop')
                      .url();
                    
                    return (
                      <Image 
                        src={imageUrl}
                        alt={imageData?.alt || post.title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    );
                  } catch (error) {
                    console.error('Error building image URL:', error);
                    return null;
                  }
                })()}
              </div>
            )}
          </header>
          
          <div className="prose prose-lg prose-invert max-w-none text-white">
            {post.body && (
              <PortableText 
                value={post.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-white mb-4 leading-relaxed">{children}</p>
                    ),
                  },
                  marks: {
                    link: ({ children, value }) => (
                      <a 
                        href={value.href} 
                        className="text-blue-400 hover:text-blue-300 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(
    `*[_type == "post" && defined(slug.current)][0...100] {
      "slug": slug.current
    }`
  )
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
