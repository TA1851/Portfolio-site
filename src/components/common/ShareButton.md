# 記事共有機能の使用方法

このプロジェクトには、記事を様々なSNSプラットフォームで共有できる機能が実装されています。

## コンポーネント

### ShareModal
記事共有のためのモーダルコンポーネントです。

### ShareButton
記事共有機能を呼び出すボタンコンポーネントです。

## 使用方法

### 基本的な使用例

```tsx
import ShareButton from '@/components/common/ShareButton';

// ボタンスタイル
<ShareButton 
  post={{
    title: "記事のタイトル",
    excerpt: "記事の説明文",
    slug: "article-slug",
    url: "https://yourdomain.com/blog/article-slug"
  }}
  variant="button"
/>

// アイコンスタイル
<ShareButton 
  post={{
    title: "記事のタイトル",
    excerpt: "記事の説明文",
    slug: "article-slug"
  }}
  variant="icon"
/>
```

### ブログページでの実装例

```tsx
// src/app/blog/[slug]/page.tsx
<ShareButton 
  post={{
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}`
  }}
  variant="icon"
/>
```

## 機能

1. **ネイティブ共有機能**: デバイスでサポートされている場合、ネイティブの共有機能を使用
2. **リンクコピー**: 記事のURLをクリップボードにコピー
3. **SNS共有**: X(Twitter), Facebook, LinkedIn, LINEでの共有
4. **レスポンシブデザイン**: モバイルとデスクトップの両方に対応
5. **ダークモード対応**: テーマに応じた見た目の変更

## 対応プラットフォーム

- X (Twitter)
- Facebook
- LinkedIn
- LINE
- リンクコピー
- ネイティブ共有（モバイル）

## 環境変数

記事の絶対URLを生成するために、以下の環境変数を設定してください：

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## カスタマイズ

### スタイルの変更

`className` propsを使用してボタンのスタイルをカスタマイズできます：

```tsx
<ShareButton 
  className="bg-green-600 hover:bg-green-700"
  variant="button"
/>
```

### 新しいSNSプラットフォームの追加

`ShareModal.tsx`の`handleSocialShare`関数に新しいケースを追加することで、他のSNSプラットフォームにも対応できます。
