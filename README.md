# Portfolio-site

![Next.js](https://img.shields.io/badge/Next.js-15.5.12-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-06b6d4?logo=tailwindcss&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-5.12.0-f03e2f?logo=sanity&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 概要

このプロジェクトは、Next.js 15とSanity CMSを使用して構築された個人ポートフォリオサイトです。GSAPによるインタラクティブなアニメーション、ダーク/ライトテーマ切り替え、Markdown/Portable Text両対応のブログ機能を備えた、モダンでパフォーマンスの高いWebサイトです。

## 主な機能

- **ポートフォリオ展示**: 作品やプロジェクトの紹介
- **ブログ機能**: Markdown・Portable Text両対応の記事投稿と管理
- **コードブロックシンタックスハイライト**: コピーボタン付きのコードブロック表示
- **タグ機能**: 記事のタグ付けとフィルタリング
- **記事共有機能**: ソーシャルメディアでの記事共有
- **自己紹介ページ**: プロフィール・スキル・タイムラインの紹介
- **テーマ切り替え**: ダークモード/ライトモードの切り替え（システム設定連動）
- **GSAPアニメーション**: ロゴのグラジェントホバーエフェクト、ヒーローセクションのクリップパスアニメーション
- **マウスストーカー**: GSAPによるカーソルフォロワーエフェクト
- **レスポンシブデザイン**: モバイル・デスクトップ両対応
- **CMSによるコンテンツ管理**: Sanity CMSを使用したコンテンツ管理

## 技術スタック

### フロントエンド

| ライブラリ | バージョン | 用途 |
| --- | --- | --- |
| Next.js | 15.5.12 | Reactフレームワーク (App Router) |
| React | 19.2.4 | UIライブラリ |
| TypeScript | 5.8.3 | 型安全な開発 |
| Tailwind CSS | 3.4.15 | スタイリング |
| GSAP | 3.14.2 | インタラクティブアニメーション |
| next-themes | 0.4.6 | テーマ切り替え（ダーク/ライト） |
| Headless UI | 2.2.4 | アクセシブルUIコンポーネント |
| Heroicons | 2.2.0 | SVGアイコン |
| lucide-react | 0.525.0 | SVGアイコン |
| react-intersection-observer | 9.16.0 | 遅延読み込み (Intersection Observer) |

### バックエンド・CMS

| ライブラリ | バージョン | 用途 |
| --- | --- | --- |
| Sanity | 5.12.0 | ヘッドレスCMS |
| next-sanity | 12.1.0 | Next.js向けSanity統合 |
| @sanity/client | 7.6.0 | SanityクライアントAPI |
| @sanity/image-url | 1.1.0 | Sanity画像URL生成 |
| @portabletext/react | 3.2.1 | Portable Textレンダリング |
| @sanity/vision | 5.12.0 | Sanity GROQ開発ツール |

### ブログ・コンテンツ

| ライブラリ | バージョン | 用途 |
| --- | --- | --- |
| react-markdown | 10.1.0 | Markdownレンダリング |
| remark-gfm | 4.0.1 | GitHub Flavored Markdown対応 |
| rehype-highlight | 7.0.2 | コードブロックシンタックスハイライト |

### ユーティリティ

| ライブラリ | バージョン | 用途 |
| --- | --- | --- |
| Fuse.js | 7.1.0 | あいまい検索 |
| date-fns | 4.1.0 | 日付操作 |
| react-share | 5.2.2 | ソーシャルシェア |
| styled-components | 6.1.19 | CSS-in-JS |

## プロジェクト構成

```powershell
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # ホームページ
│   ├── layout.tsx          # ルートレイアウト
│   ├── globals.css         # グローバルスタイル
│   ├── blog/               # ブログ一覧・詳細
│   │   ├── page.tsx
│   │   ├── [slug]/         # 記事詳細ページ
│   │   └── tag/[slug]/     # タグ別記事一覧
│   ├── about/              # 自己紹介ページ
│   ├── works/              # 作品一覧ページ
│   └── [slug]/             # 動的ルート
├── components/
│   ├── common/             # 共通コンポーネント
│   │   ├── Header.tsx      # ナビゲーション (GSAPグラジェントエフェクト)
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx # テーマ切り替え
│   │   ├── MouseStalker.tsx# GSAPカーソルフォロワー
│   │   ├── ShareButton.tsx # ソーシャルシェアモーダル
│   │   ├── WorksGrid.tsx   # 作品グリッド
│   │   ├── MarkdownRenderer.tsx # コードハイライト+コピー機能
│   │   ├── TagFilter.tsx   # タグフィルター
│   │   └── TagList.tsx
│   ├── home/               # ホームページ専用
│   │   ├── HeroSection.tsx # GSAPクリップパスアニメーション
│   │   ├── AboutSection.tsx
│   │   └── WorksSection.tsx
│   └── providers/
│       └── ThemeProvider.tsx
├── data/                   # 静的データ (about, works)
├── lib/                    # Sanityクエリ・クライアント
├── types/                  # TypeScript型定義
└── utils/                  # ヘルパー関数 (skillColors等)
```

## セットアップ

### 1. 依存関係のインストール

```poiwershell
npm install
```

### 2. 環境変数の設定

`.env.local` を作成し、以下を設定します:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

### 3. 開発サーバーの起動

```powershell
npm run dev
```

### 4. ブラウザでアクセス

```powershell
http://localhost:3000
```

### Sanity Studio

Sanity Studioへは以下のURLでアクセスできます:

```powershell
http://localhost:3000/studio
```

## スクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーの起動（Turbopack使用） |
| `npm run build` | 本番用ビルド |
| `npm run start` | 本番サーバーの起動 |
| `npm run lint` | ESLintによるコード検証 |
| `npm run deploy` | ビルド後に本番サーバーを起動 |

## アーキテクチャ特記事項

- **キャッシュ戦略**: ブログページは `force-dynamic` + `cache: 'no-store'` を使用し、Sanityから常に最新データを取得
- **画像最適化**: Sanity CDN経由でwebpフォーマット・幅・品質を指定して最適化
- **動的スキルカラー**: Tailwind `safelist` により、実行時に決定するスキルカラークラス（例: `bg-blue-500`）を保持
- **コンテンツ柔軟性**: ブログ記事はMarkdownとPortable Textの両形式に対応
- **SEO対応**: 動的タイトルテンプレート + Open Graph / Twitter Cardメタデータ設定
- **Next.js 15の非同期パラメータ仕様**: 動的ルートの `params` を非同期で処理

## コードレビューと開発コマンド

### コードレビュー

以下のコマンドを使用してコードレビューを実施しました:

- 1. **エラー確認**:

```powershell
npm run lint
```

- ESLintを使用してコードの静的解析を実施。

- 2.**型チェック**:

```powershell
npm run type-check
```

- TypeScriptの型安全性を確認。

- 3.**テスト実行**:

```bash
npm run test
```

- Jestを使用してユニットテストを実行。

- 4.**コードフォーマット**:

```powershell
npm run format
```

- Prettierを使用してコードをフォーマット。

### 開発コマンド

以下のコマンドを使用して開発環境をセットアップ:

- 1.**依存関係のインストール**:

```powershell
npm install
```

- 2.**開発サーバーの起動**:

```bash
npm run dev
```

- ローカル環境でNext.jsの開発サーバーを起動。

- 3.**ビルド**:

```powershell
npm run build
```

- プロダクション用にアプリケーションをビルド。

- 4.**Sanity Studioの起動**:（ブログコンテンツの更新）

```powershell
sanity start
```

- Sanity CMSの管理画面を起動。

---

これらのコマンドを活用して、プロジェクトの品質を維持しながら効率的に開発を進めています。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

## ハッシュタグ機能

このプロジェクトでは、Sanity CMSの標準機能を活用した高度なハッシュタグシステムを実装しています。

### 機能概要

- **タグ管理**: Sanity CMSでタグを一元管理
- **タグフィルタリング**: ブログページでのリアルタイムフィルタリング
- **タグ検索**: タグ名での検索機能
- **カラー分類**: タグごとの色分け表示
- **投稿数表示**: タグごとの記事数表示
- **専用ページ**: タグ別記事一覧ページ

### 実装コンポーネント

#### 共通コンポーネント

- `TagComponent.tsx`: 単一タグの表示コンポーネント
- `TagList.tsx`: タグリストの表示コンポーネント
- `TagFilter.tsx`: タグフィルター機能付きコンポーネント

#### ページコンポーネント

- `BlogContent.tsx`: ブログ一覧のクライアントサイドフィルタリング
- `/blog/tag/[slug]/page.tsx`: タグ別記事一覧ページ

### データ構造

#### タグスキーマ（tagType.ts）

```typescript
{
  name: 'tag',
  title: 'タグ',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },      // タグ名
    { name: 'slug', type: 'slug' },        // URL用スラッグ
    { name: 'description', type: 'text' }, // 説明（オプション）
    { name: 'color', type: 'string' }      // 色分類
  ]
}
```

#### 記事スキーマのタグフィールド（postType.ts）

```typescript
{
  name: 'tags',
  title: 'タグ',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'tag' }] }]
}
```

### 使用方法

1. **Sanity Studioでタグ作成**:
   - 新しいタグドキュメントを作成
   - タグ名、スラッグ、色を設定

2. **記事にタグ追加**:
   - 記事編集時にタグフィールドから既存タグを選択
   - 複数タグの選択が可能

3. **フロントエンドでの表示**:
   - ブログ一覧ページで自動的にタグフィルター機能が利用可能
   - 記事詳細ページでタグが表示される
   - タグクリックで関連記事一覧に遷移

### SEO最適化

- タグページごとに適切なメタタグを自動生成
- 構造化データの実装
- 静的サイト生成（SSG）による高速化

---

## 記事共有機能

ブログ記事の共有機能を実装しており、以下のコンポーネントが利用可能です：

### 共有コンポーネント

- `ShareButton.tsx`: インライン共有ボタン
- `ShareModal.tsx`: 共有オプション付きモーダル  
- `FloatingShareButton.tsx`: スクロール時に表示される浮動ボタン

### 対応プラットフォーム

- X (Twitter)
- Facebook  
- LinkedIn
- URL コピー

### 使用例

```tsx
// 基本的な共有ボタン
<ShareButton 
  url="https://example.com/post" 
  title="記事タイトル"
/>

// 浮動共有ボタン
<FloatingShareButton 
  url="https://example.com/post"
  title="記事タイトル" 
/>
```

```powershell
npx sanity start
```

react&next version

```powershell
npm list --version
npx next --version
```

## 脆弱性対応

react:19.1.2
next:15.3.6
