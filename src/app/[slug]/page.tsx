import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

// 型定義を追加
interface PostSummary {
  _id: string;
  title: string;
  slug: {
    current: string;
  } | null;
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({ params }: PostPageProps) {
  try {
    const resolvedParams = await params;
    
    // クライアント設定のデバッグ
    console.log("Client config:", { projectId, dataset });
    console.log("Client full config:", client.config());
    
    // プロジェクトIDとデータセットが正しく設定されているかチェック
    if (!projectId || projectId === 'your-project-id') {
      return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
          <Link href="/" className="hover:underline">
            ← Back to posts
          </Link>
          <h1 className="text-4xl font-bold mb-8">設定エラー</h1>
          <p>SanityプロジェクトIDが正しく設定されていません。</p>
          <div className="mt-4 p-4 bg-yellow-100 rounded text-sm">
            <p className="font-bold">確認事項:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>環境変数 NEXT_PUBLIC_SANITY_PROJECT_ID が設定されているか</li>
              <li>環境変数 NEXT_PUBLIC_SANITY_DATASET が設定されているか</li>
              <li>.env.local ファイルが存在するか</li>
            </ul>
            <p className="mt-2">現在の設定: Project ID: {projectId}, Dataset: {dataset}</p>
          </div>
        </main>
      );
    }

    if (!dataset || dataset === 'production') {
      return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
          <Link href="/" className="hover:underline">
            ← Back to posts
          </Link>
          <h1 className="text-4xl font-bold mb-8">データセットエラー</h1>
          <p>Sanityデータセットが正しく設定されていません。</p>
          <div className="mt-4 p-4 bg-yellow-100 rounded text-sm">
            <p>一般的なデータセット名: &quot;production&quot; または &quot;development&quot;</p>
            <p>現在の設定: {dataset}</p>
          </div>
        </main>
      );
    }
    
    // デバッグ: 利用可能な投稿をすべて取得
    const allPosts = await client.fetch<PostSummary[]>(`*[_type == "post"]{title, slug, _id}`);
    console.log("All posts:", allPosts);
    console.log("Looking for slug:", resolvedParams.slug);
    
    const post = await client.fetch<SanityDocument>(POST_QUERY, resolvedParams, options);
    console.log("Found post:", post);
    
    if (!post) {
      return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
          <Link href="/" className="hover:underline">
            ← Back to posts
          </Link>
          <h1 className="text-4xl font-bold mb-8">投稿が見つかりません</h1>
          <p>スラッグ「{resolvedParams.slug}」に対応する投稿が見つかりませんでした。</p>
          <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
            <p className="font-bold">利用可能な投稿:</p>
            {allPosts.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {allPosts.map((p: PostSummary) => (
                  <li key={p._id}>
                    {p.title} (slug: {p.slug?.current || 'なし'})
                  </li>
                ))}
              </ul>
            ) : (
              <p>投稿が見つかりません</p>
            )}
          </div>
        </main>
      );
    }

    const postImageUrl = post.image && urlFor(post.image)
      ? urlFor(post.image)?.width(550).height(310).url()
      : null;

    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={post.title || "投稿画像"}
            className="aspect-video rounded-xl"
            width={550}
            height={310}
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{post.title || "タイトルなし"}</h1>
        <div className="prose">
          {post.publishedAt && (
            <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
          )}
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      </main>
    );
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-8">エラーが発生しました</h1>
        <p>投稿を読み込めませんでした。しばらく経ってからもう一度お試しください。</p>
        <div className="mt-4 p-4 bg-red-100 rounded text-sm">
          <p>エラーの詳細: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <p className="mt-2">ブラウザのコンソールで詳細を確認してください。</p>
        </div>
      </main>
    );
  }
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<{ slug: string }[]>(
      `*[_type == "post" && defined(slug.current)][0...100] {
        "slug": slug.current
      }`
    )
    
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}