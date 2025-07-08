# Portfolio-site

## 概要

このプロジェクトは、Next.js 15とSanity CMSを使用して構築された個人ポートフォリオサイトです。モダンなフロントエンドテクノロジーを活用し、レスポンシブでパフォーマンスの高いWebサイトを実現しています。

## 主な機能

- **ポートフォリオ展示**: 作品やプロジェクトの紹介
- **ブログ機能**: 記事の投稿と管理
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