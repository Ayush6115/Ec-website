# 🛍️ MERN Eコマース フロントエンド

これは、**MERNスタック（MongoDB, Express, React, Node.js）** を使用して構築されたフル機能のECアプリケーションの **Reactベースのフロントエンド** です。  
一般ユーザー向けにはモダンなショッピング体験を提供し、管理者向けには商品・注文・メッセージの管理が可能なダッシュボードを備えています。

---

## 🚀 はじめに

### ✅ 前提条件

以下の環境が必要です：

- **Node.js**（v18 以上 推奨）
- **npm**（Node.js に同梱）または **Yarn**

### 📦 インストール手順

リポジトリをクローンし、依存パッケージをインストールします：

```bash
cd frontend
npm install
```

### ▶️ 開発サーバーの起動

React アプリをローカルで起動するには：

```bash
npm start
```

起動後、ブラウザで以下を開きます：

```
http://localhost:3000
```

※ デフォルトでは、バックエンドと `http://localhost:5000` で通信します。

---

## ⚙️ 技術スタックとライブラリ

このプロジェクトでは、以下の技術を使用しています：

- **React（Hooks + 関数コンポーネント）** – フロントエンド開発
- **React Router v6** – 宣言的ルーティングとネストレイアウト
- **Axios** – バックエンドAPIとのHTTP通信
- **JWT（JSON Web Tokens）** – トークン認証（localStorageに保存）
- **プレーンCSS** – プリプロセッサなし、ページ単位で分割管理

---

## 🧭 プロジェクト構成

```
frontend/
├── public/                   # 静的ファイル（HTML, favicon など）
├── src/
│   ├── admin/                # 管理画面用のコンポーネント・ページ・スタイル
│   │   ├── components/       # AdminNavbar, AdminFooterなど
│   │   ├── pages/            # 管理者ページ（商品・注文・メッセージ管理）
│   │   └── styles/           # 管理者UI用のCSS
│   ├── components/           # 共通UIパーツ（Navbar, Footerなど）
│   ├── pages/                # ユーザー向けページ（ホーム、カート、プロフィールなど）
│   ├── services/             # Axiosの設定とAPIラッパー
│   ├── styles/               # ユーザーUI用CSS
│   ├── App.jsx               # ルーティング設定ファイル
│   ├── index.js              # エントリーポイント
│   └── index.css             # グローバルスタイル
├── .gitignore
├── package.json
└── README.md
```

### 🧩 この構成の理由

- **責務の分離**：ユーザー側と管理者側のコードを明確に分離
- **スケーラビリティ**：機能追加やリファクタリングが容易
- **再利用性の高いUI**：共通コンポーネントは `/components` に集約
- **CSSの分離**：管理画面とユーザー画面でスタイルを分離

---

## 🛣 ルーティング構成

### 🔹 ユーザー向けルート

| パス               | コンポーネント       | 説明                                 |
|--------------------|----------------------|------------------------------------|
| `/`                | `HomePage`           | トップページ、注目商品を表示          |
| `/login`           | `LoginPage`          | ログインページ                       |
| `/signup`          | `SignupPage`         | 新規登録ページ                       |
| `/profile`         | `ProfilePage`        | プロフィール（保護ルート）            |
| `/products`        | `AllProduct`         | 全商品の一覧                         |
| `/men`             | `MensCategory`       | メンズカテゴリ                       |
| `/women`           | `WomensCategory`     | レディースカテゴリ                   |
| `/kids`            | `KidsCategory`       | キッズカテゴリ                      |
| `/product/:id`     | `DetailedProduct`    | 商品詳細ページ                      |
| `/cart`            | `Cart`               | ショッピングカート                   |
| `/checkout`        | `Checkout`           | 配送先・請求情報の入力               |
| `/payment`         | `Payment`            | 決済ページ                          |
| `/order-success`   | `OrderSuccess`       | 注文完了確認ページ                   |
| `/orders`          | `MyOrderPage`        | 注文履歴ページ                       |
| `/contact`         | `ContactUs`          | お問い合わせページ                   |
| `/about`           | `AboutUs`            | サイト概要ページ                     |
| `/login-admin`     | `AdminLoginPage`     | 管理者ログインページ                 |

### 🔸 管理者向けルート（`/admin` プレフィックス）

| パス                             | コンポーネント           | 説明                                    |
|----------------------------------|---------------------------|--------------------------------------|
| `/admin`                         | `AdminLayout`             | 管理画面ダッシュボード                 |
| `/admin/add-product`             | `AddProduct`              | 商品追加ページ                        |
| `/admin/update-product`          | `UpdateProduct`           | 商品一覧（編集用）                    |
| `/admin/update-product-form/:id` | `UpdateProductForm`       | 特定商品を編集                        |
| `/admin/update-order`            | `UpdateOrder`             | 注文管理ページ                        |
| `/admin/update-order-form/:id`   | `UpdateOrderForm`         | 注文編集ページ                        |
| `/admin/message`                 | `AllMessages`             | ユーザーからのメッセージ管理           |

> 管理者ページは `AdminLayout` によってレイアウトされ、ユーザー用のナビゲーションやフッターは表示されません。

---

## 🔐 認証の流れ

- **JWTトークン** を用いてユーザーと管理者を認証
- `localStorage` に保存されるキー：
  - `token` → ユーザー用
  - `adminToken` → 管理者用
- ルート遷移時に：
  - トークンをデコードして有効期限を確認
  - 期限切れの場合、ストレージをクリアしログアウト処理
- **保護ルート**：
  - `/profile`, `/orders`, `/admin/*` はログイン必須

---

## 🌐 APIとの連携（`src/services/api.js`）

- Axiosインスタンスに以下の設定を追加：
  - `baseURL = http://localhost:5000/api`
  - トークンが存在する場合、`Authorization` ヘッダーに自動で付加
- もし `401 Unauthorized` が返ってきた場合：
  - トークンを削除し、ログインページにリダイレクト

---

## 🧪 テスト

React Testing Library による基本的なテストが含まれています。

### 実行コマンド：

```bash
npm test
```

> Jest、Cypress、Vitestを使ったコンポーネント/統合/E2Eテストの拡張も可能です。

---

## 🧱 ビルドとデプロイ

本番環境用にビルドするには：

```bash
npm run build
```

- 出力は `/build` ディレクトリに保存されます。
- 以下のような静的ホスティングにデプロイ可能：
  - **Vercel**
  - **Netlify**
  - **Expressバックエンド** に組み込み

---

## 🎨 スタイリングについて

- **プレーンCSS** のみを使用（SASS, SCSS, CSS-in-JSなし）
- スタイルの分離：
  - `src/styles/` → ユーザーUI用
  - `src/admin/styles/` → 管理者UI用
- グローバルスタイルは `index.css` と `App.css`
- 読みやすさのため、**BEM風の命名規則** を使用

---

## 🧩 主なコンポーネント一覧

### 🔧 共通UI

- `Navbar`, `Footer`
- `ProductCard`, `Carousel`, `Search`, `Testimonial`
- `FeaturedSectionCards`

### 🧍 ユーザーページ

- 認証：`LoginPage`, `SignupPage`
- 商品系：`HomePage`, `AllProduct`, `DetailedProduct`, `Cart`, `Checkout`, `Payment`
- アカウント関連：`ProfilePage`, `MyOrderPage`
- 情報ページ：`AboutUs`, `ContactUs`, `OrderSuccess`

### 🛠 管理者画面

- ログイン：`AdminLoginPage`
- 商品管理：`AddProduct`, `UpdateProduct`, `UpdateProductForm`
- 注文管理：`UpdateOrder`, `UpdateOrderForm`
- メッセージ管理：`AllMessages`
- レイアウト：`AdminNavbar`, `AdminFooter`, `AdminLayout`

---

## 📬 コントリビューション

貢献は大歓迎です！大きな変更の前にはまずIssueを作成してください。

### 貢献方法：

1. フォークしてください
2. ブランチを作成：`git checkout -b feature/your-feature`
3. 変更をコミット：`git commit -m 'Add feature'`
4. プッシュ：`git push origin feature/your-feature`
5. プルリクエストを送信

---

## 📄 ライセンス

このプロジェクトは [MITライセンス](LICENSE) に基づいて公開されています。

---

## 👨‍💻 開発者

**Ayush Ranjan**  
GitHub: [@ayush6115](https://github.com/ayush6115)

---
