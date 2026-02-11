# Portfolio-site

## 概要

このプロジェクトは、Next.js 15とSanity CMSを使用して構築された個人ポートフォリオサイトです。モダンなフロントエンドテクノロジーを活用し、レスポンシブでパフォーマンスの高いWebサイトを実現しています。

## 主な機能

- **ポートフォリオ展示**: 作品やプロジェクトの紹介
- **ブログ機能**: 記事の投稿と管理
- **ハッシュタグ機能**: 記事のタグ付けとフィルタリング
- **記事共有機能**: ソーシャルメディアでの記事共有
- **自己紹介ページ**: プロフィールとスキルの紹介
- **テーマ切り替え**: ダークモード/ライトモードの切り替え
- **レスポンシブデザイン**: モバイル・デスクトップ両対応
- **CMSによるコンテンツ管理**: Sanity CMSを使用したコンテンツ管理

## 技術スタック

### フロントエンド
- **Next.js 15**: React フレームワーク
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: スタイリング
- **React 19**: UIライブラリ
- **Lucide React**: アイコン
- **Next Themes**: テーマ切り替え機能

### バックエンド・CMS
- **Sanity CMS**: ヘッドレスCMS
- **Sanity Vision**: CMSツール
- **Portable Text**: リッチテキスト管理

### その他のライブラリ
- **Fuse.js**: 検索機能
- **Date-fns**: 日付操作
- **React Share**: ソーシャルシェア機能
- **Styled Components**: CSS-in-JS

## プロジェクト構成

```
src/
├── app/                 # Next.js App Router
│   ├── blog/           # ブログページ
│   ├── about/          # 自己紹介ページ
│   ├── works/          # 作品一覧ページ
│   └── [slug]/         # 動的ルート
├── components/         # React コンポーネント
│   ├── common/         # 共通コンポーネント
│   ├── home/           # ホームページ専用コンポーネント
│   └── providers/      # プロバイダーコンポーネント
├── data/               # 静的データ
├── lib/                # ユーティリティ
├── types/              # TypeScript型定義
└── utils/              # ヘルパー関数
```

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 環境変数の設定:
- Sanity CMSの設定を環境変数ファイルに追加

3. 開発サーバーの起動:
```bash
npm run dev
```

4. ブラウザでアクセス:
```
http://localhost:3000
```

## スクリプト

- `npm run dev`: 開発サーバーの起動（Turbopack使用）
- `npm run build`: 本番用ビルド
- `npm run start`: 本番サーバーの起動
- `npm run lint`: ESLintによるコード検証

## 特徴

- **高速なパフォーマンス**: Next.js 15の最新機能を活用
- **SEO対応**: メタデータとOGPの最適化
- **アクセシビリティ**: セマンティックHTMLと適切なARIA属性
- **モダンなUI**: Tailwind CSSによる美しいデザイン
- **コンテンツ管理**: Sanity CMSによる直感的な管理画面
- Next.js 15の非同期パラメータ仕様に対応

## コードレビューと開発コマンド

### コードレビュー

以下のコマンドを使用してコードレビューを実施しました:

1. **エラー確認**:
   ```bash
   npm run lint
   ```
   - ESLintを使用してコードの静的解析を実施。

2. **型チェック**:
   ```bash
   npm run type-check
   ```
   - TypeScriptの型安全性を確認。

3. **テスト実行**:
   ```bash
   npm run test
   ```
   - Jestを使用してユニットテストを実行。

4. **コードフォーマット**:
   ```bash
   npm run format
   ```
   - Prettierを使用してコードをフォーマット。

### 開発コマンド

以下のコマンドを使用して開発環境をセットアップ:

1. **依存関係のインストール**:
   ```bash
   npm install
   ```

2. **開発サーバーの起動**:
   ```bash
   npm run dev
   ```
   - ローカル環境でNext.jsの開発サーバーを起動。

3. **ビルド**:
   ```bash
   npm run build
   ```
   - プロダクション用にアプリケーションをビルド。

4. **Sanity Studioの起動**:
   ```bash
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

```
npx sanity start
```

react&next version
```
npm list --version
npx next --version
```

# 脆弱性対応
react:19.1.2
next:15.3.6