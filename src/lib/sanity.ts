import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-05-03',
  useCdn: false, // CDNを無効化して最新データを取得
  perspective: 'published', // 公開されたコンテンツのみを取得
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