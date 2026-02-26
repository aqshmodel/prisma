# Aqsh prisma - 組織シナジー最大化ツール

## プロジェクト概要
このプロジェクトは、組織内のメンバーの特性を診断し、チームビルディングやマネジメントに活用するためのツール「Aqsh prisma」のフロントエンドアプリケーションです。
**Next.js**を中心としたモダンなWeb技術スタックを採用しています。

## 技術スタック
- **Framework:** Next.js 15+ (App Router / Pages Router 混在の可能性あり ※要確認), React 19
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

当プロジェクトは静的サイト生成（Static Site Generation; SSG / `output: export`）を採用しています。VPSではなく、**ロリポップ！などの共用レンタルサーバー**へFTP等でデプロイする場合は、以下の手順で行います。

**① ビルドを実行する**
ターミナルを開き、プロジェクトのルートディレクトリ（`package.json` がある場所）で以下のコマンドを実行します。
```bash
npm run build
```

**② 出力ディレクトリを確認する**
ビルドが成功すると、プロジェクトルートに `out` というディレクトリが生成・上書きされます。
この `out` ディレクトリの中身が、本番環境で動かすための最終的な成果物（HTML, CSS, JS, 画像など）です。

**③ ロリポップ！FTP等でアップロードする**
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

## ディレクトリ構成の概要
- `src/features`: 機能ごとに分割されたモジュール（診断ロジック、結果表示など）
- `src/components`: 共通UIコンポーネント
- `src/stores`: グローバルステート管理 (Zustand)
- `documents`: 仕様書や計画書（※一部古い情報が含まれます。詳細は `documents/project-structure.md` を参照）

## 注意事項
`documents` ディレクトリ内にある `dev-plan.md` などには、Laravel (PHP) をバックエンドに使用する計画が含まれていますが、現在の実装は **Next.js (Node.js)** ベースで進行しています。
最新の仕様や実装状況については、コードベースおよび `documents/project-structure.md` を正としてください。
