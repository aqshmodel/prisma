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

### 3. ビルド & スタート
```bash
npm run build
npm run start
```

## ディレクトリ構成の概要
- `src/features`: 機能ごとに分割されたモジュール（診断ロジック、結果表示など）
- `src/components`: 共通UIコンポーネント
- `src/stores`: グローバルステート管理 (Zustand)
- `documents`: 仕様書や計画書（※一部古い情報が含まれます。詳細は `documents/project-structure.md` を参照）

## 注意事項
`documents` ディレクトリ内にある `dev-plan.md` などには、Laravel (PHP) をバックエンドに使用する計画が含まれていますが、現在の実装は **Next.js (Node.js)** ベースで進行しています。
最新の仕様や実装状況については、コードベースおよび `documents/project-structure.md` を正としてください。
