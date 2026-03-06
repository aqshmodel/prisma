# Aqsh prisma - 組織シナジー最大化ツール

## プロジェクト概要
このプロジェクトは、組織内のメンバーの特性を診断し、チームビルディングやマネジメントに活用するためのツール「Aqsh prisma」のフロントエンドアプリケーションです。
**Next.js**を中心としたモダンなWeb技術スタックを採用しています。

## 技術スタック
- **Framework:** Next.js 16 (App Router, Static Export), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Testing:** Vitest
- **Icons:** Lucide React
- **Charts:** Recharts

## セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:3000` にアクセスしてください。

### 3. デプロイ（ビルドとFTPアップロード）

当プロジェクトは静的サイト生成（Static Site Generation; SSG / `output: export`）を採用しています。VPSではなく、**ロリポップ！などの共用レンタルサーバー**へデプロイする場合は、以下の手順で行います。

**① ビルドを実行する**
ターミナルを開き、プロジェクトのルートディレクトリ（`package.json` がある場所）で以下のコマンドを実行します。
```bash
npm run build
```

**② rsync でデプロイする（推奨）**
SSH対応サーバーでは、FTPより圧倒的に高速な `rsync` を使用します。差分のみ転送するため、2回目以降は数秒で完了します。
```bash
rsync -avz --delete -e "ssh -p 2222" out/ boyfriend.jp-aqsh@ssh.lolipop.jp:/home/users/2/boyfriend.jp-aqsh/web/prisma/
```

> 💡 初回は全ファイル転送（4,000ファイル超）のため数分かかりますが、以降は変更ファイルのみの差分転送です。

**③ FTPでアップロードする場合（非推奨・低速）**
生成された **`out` ディレクトリの中身すべて**を、ロリポップ等レンタルサーバーの公開ディレクトリ（対象ドメインのドキュメントルート）へアップロード（上書き）してください。
※ `out` フォルダ自体をアップロードするのではなく、`out` の**中にある** `index.html` や `_next` フォルダなどを、サーバーの公開ディレクトリ直下に配置するようにしてください。

> ⚠️ **【重要】 ロリポップサーバーでのURLについて (.html の省略)**
> 本プロジェクトは Next.js設定で `trailingSlash: false`（デフォルト）としてビルドされています。
> そのため、各記事のファイルは `out/articles/slug.html` という純粋なHTMLファイルとして生成されています。
> 
> ロリポップ等の共用サーバーでは、通常の設定のまま `https://prisma.aqsh.co.jp/articles/slug` にアクセスすると、サーバー側で `.html` をうまく補完できずに **404 Page Not Found** になる場合があります。
> 
> **対策案:**
> 1. アップロードした `out` フォルダ（の公開ルート）に `.htaccess` を配置し、拡張子なしのURLアクセスを `.html` にリライトする設定を追加する。
>    ```apache
>    RewriteEngine On
>    RewriteCond %{REQUEST_FILENAME} !-d
>    RewriteCond %{REQUEST_FILENAME}\.html -f
>    RewriteRule ^(.*)$ $1.html [L]
>    ```
> 2. または、Next.js側のリンク仕様に合わせて運用する。
> 
> もし現在404エラーが出ている場合は、再度ローカルで `npm run build` を実行して生成された **最新の `out` フォルダの中身**（`articles` フォルダ内に直接 `.html` ファイルが入っている状態）を、改めてFTPで**すべて上書きアップロード**してみてください。

## ディレクトリ構成と各システムの役割

現在、本プロジェクトは主に**「診断システム」「タイプ別相性診断」「タイプ詳細ページ」「記事（ブログ）更新システム」**の4つの大きなドメインから構成されています。

### 1. 診断システム
ユーザーが設問に回答し、自身のパーソナリティタイプ（16タイプ等）を診断・確認するためのコア機能です。

- **`src/app/diagnosis/`** — 診断ページ（URL: `/diagnosis`）
- **`src/app/result/`** — 診断結果ページ（URL: `/result`）
- **`src/features/diagnosis/`** — 診断UI（プログレスバー、質問票、選択肢、トランジション）
- **`src/features/result/`** — 結果表示UI（タイプ詳細、相性CTA、強み・弱み解説、印刷レイアウト）
- **`src/stores/`** — Zustandによるグローバルステート管理

### 2. タイプ別相性診断
16タイプ × 15タイプ = 240通りの全相性ページを静的生成。ソシオニクスの関係性理論に基づく14種の相性パターン（双対関係、活性化関係、鏡像関係、衝突関係など）を解説します。

- **`src/app/types/[code]/compatibility/[target]/`** — 相性詳細ページ（URL: `/types/ENTp/compatibility/ISFp`）
- **`src/app/compatibility/`** — 相性検索ハブページ（URL: `/compatibility`）
- **`src/features/compatibility/`** — 相性詳細UI（CompatibilityPage, CompatibilityCard）
- **`src/lib/constants/compatibility.ts`** — 14種の相性関係定義・マッピングロジック
- **`src/lib/constants/compatibility-tips-*.ts`** — 240通りの固有 concreteTip（4ファイル、クアドラ別）
- **`src/components/common/CompatibilitySearchModal.tsx`** — グローバル相性検索モーダル
- **`src/features/welcome/components/CompatibilitySection.tsx`** — トップページの相性セクション

### 3. タイプ詳細ページ
16タイプそれぞれの性格特性、強み、弱み、適職、相性を解説する静的ページ群です。

- **`src/app/types/[code]/`** — タイプ詳細ページ（URL: `/types/ENTp`）
- **`src/app/types/[code]/articles/`** — タイプ別記事一覧ページ
- **`src/features/type-detail/`** — タイプ詳細UI、トリセツ印刷レイアウト
- **`src/features/result/data/os/`** — 16タイプのマスタデータ（日本語名、コード、説明、相性情報）

### 4. 記事（ブログ）更新システム
B2C向けのSEO集客を目的とし、ユーザーを診断へ誘導するためのコンテンツ配信システムです。Markdown (MDX) を用いたSSG（静的サイト生成）ベースで構築されています。

- **`content/articles/`**
  - 各記事のマークダウンファイル（`.mdx`）の格納場所。フロントマター（タイトル、タグ、日付など）と本文データを持つ。
- **`src/app/articles/`**
  - 記事一覧ページ（`/articles`）や記事詳細ページ（`/articles/[slug]`）、ページネーションのルーティング。
- **`src/features/articles/`**
  - MDXのパース処理、目次生成、関連記事リスト、記事カードなどのUIコンポーネント群。
- **`scripts/`**
  - 記事管理を自動化・効率化するためのスクリプト群（主にPython/Node.js）。
  - （例）Gemini APIを用いたカバー画像の一括自動生成、ガイドライン・文字数・AIパターンの自動チェック、SEO関連メタデータの更新、Google Search Consoleからのアナリティクス取得など。
- **`public/images/blog/`**
  - 記事で使用される画像（主に生成AIで作成され、軽量化されたWebP/JPEG画像）の保存先。
- **`documents/`**
  - SEO戦略、キーワード選定リスト、執筆ガイドライン、実装計画などのドキュメント群。

### 全体共通
- **`src/components/`**: 共通UIコンポーネント（ボタン、ヘッダー、フッター、相性検索モーダルなど）。
- **`src/types/`**: アプリケーション全体で使い回す共通の型定義。
- **`src/lib/constants/`**: サイト設定、タイプマッピング、カラーマップなどの定数。
- **`.github/workflows/`**: GitHub Actionsの設定。アナリティクスデータの定期自動取得などのCI/CDパイプライン。

## SEO対策
- **構造化データ (JSON-LD):** 全ページに `BreadcrumbList` を設定。記事ページには `Article`, `FAQPage` スキーマも設定。
- **canonical URL:** 全ページに `alternates.canonical` を設定。
- **OGP:** 各タイプ詳細ページに動的OG画像生成（`opengraph-image` ルート）。相性ページにも明示的OG画像設定。
- **サイトマップ:** `sitemap.xml` を静的生成（全411ページ）。
- **タイプ名の日本語併記:** UIおよびmetaデータにおいて、英字コード（ENTp等）単独表示を避け、日本語タイプ名+ソシオニクスコード（`発明家 (ILE)`）を併記。

## 注意事項
`documents` ディレクトリ内にある `dev-plan.md` などには、初期段階のLaravel (PHP) をバックエンドに使用する計画が含まれている場合がありますが、現在の実装は **Next.js (App Router)** ベースの完全静的生成で進行しています。
最新の仕様や実装状況については、コードベースおよび `documents/プロジェクト戦略/` 配下の公式ドキュメントを正としてください。
