import { client } from '@/lib/sanity'
import { postQuery } from '@/lib/queries'
import { Post } from '@/types'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { PortableText } from '@portabletext/react'
import MarkdownRenderer from '@/components/common/MarkdownRenderer'
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
            {/* Markdownコンテンツがある場合はMarkdownを表示 */}
            {post.markdown && (
              <MarkdownRenderer content={post.markdown} />
            )}
            
            {/* PortableTextコンテンツがある場合はPortableTextを表示 */}
            {post.body && !post.markdown && (
              <PortableText 
                value={post.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-white mb-4 leading-relaxed">{children}</p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-white text-4xl font-bold mb-6 mt-8">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-white text-3xl font-semibold mb-5 mt-7">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-white text-2xl font-semibold mb-4 mt-6">{children}</h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-white text-xl font-semibold mb-3 mt-5">{children}</h4>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-gray-800/30 rounded-r">
                        <div className="text-gray-300 italic">{children}</div>
                      </blockquote>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="text-white list-disc list-inside mb-4 space-y-2">{children}</ul>
                    ),
                    number: ({ children }) => (
                      <ol className="text-white list-decimal list-inside mb-4 space-y-2">{children}</ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="text-white">{children}</li>
                    ),
                    number: ({ children }) => (
                      <li className="text-white">{children}</li>
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
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-white">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    ),
                  },
                  types: {
                    code: ({ value }) => (
                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4">
                        <code className="text-green-400 font-mono text-sm whitespace-pre">
                          {value.code}
                        </code>
                      </pre>
                    ),
                    image: ({ value }) => {
                      if (!value?.asset) return null;
                      
                      try {
                        const imageUrl = urlFor(value)
                          .width(800)
                          .fit('max')
                          .url();
                        
                        return (
                          <div className="my-6">
                            <Image
                              src={imageUrl}
                              alt={value.alt || '画像'}
                              width={800}
                              height={400}
                              className="rounded-lg"
                            />
                            {value.caption && (
                              <p className="text-gray-400 text-sm text-center mt-2 italic">
                                {value.caption}
                              </p>
                            )}
                          </div>
                        );
                      } catch (error) {
                        console.error('Error building image URL:', error);
                        return null;
                      }
                    },
                  },
                }}
              />
            )}
            
            {/* コンテンツがない場合のメッセージ */}
            {!post.body && !post.markdown && (
              <p className="text-gray-400 italic">
                コンテンツがありません。
              </p>
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
