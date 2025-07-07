import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-12-01', // 最新のAPIバージョンに更新
  useCdn: false, // CDNを無効化して最新データを取得
  perspective: 'published', // 公開されたコンテンツのみを取得
  token: process.env.SANITY_API_TOKEN, // 認証トークンを使用（環境変数に設定）
  ignoreBrowserTokenWarning: true, // ブラウザでのトークン警告を無視
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function getOptimizedImageUrl(source: SanityImageSource, width: number = 800) {
  return urlFor(source)
    .width(width)
    .format('webp')
    .quality(80)
    .url()
}

export { client }