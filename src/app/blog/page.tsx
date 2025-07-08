import { client } from '@/lib/sanity'
import { postsQuery, tagsQuery } from '@/lib/queries'
import { Post, Tag } from '@/types'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { BlogContent } from '@/components/blog/BlogContent'

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

async function getTags(): Promise<Tag[]> {
  try {
    const tags = await client.fetch(tagsQuery, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    return tags || []
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    getPosts(),
    getTags()
  ])

  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-20">
      <Header />
      <BlogContent initialPosts={posts} initialTags={tags} />
      <Footer />
    </div>
  )
}
