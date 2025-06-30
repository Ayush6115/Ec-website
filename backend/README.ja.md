# 🛍️ MERN Eコマース バックエンド

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)

これは **MERN スタック（MongoDB, Express, React, Node.js）** を使用して構築された、ECサイトの**バックエンド**です。  
ユーザー登録・ログイン、管理者ログイン、商品管理、カート処理、注文処理、お問い合わせメッセージ、プロフィール更新などのAPIを提供します。

---

## ⚙️ 使用技術

- **Node.js** – JavaScript ランタイム
- **Express.js** – 軽量なWebフレームワーク
- **MongoDB** – NoSQL データベース
- **Mongoose** – MongoDB用 ODMライブラリ
- **JWT** – トークンによる認証
- **Joi** – リクエストバリデーション
- **Bcrypt** – パスワードハッシュ化

---

## 📁 フォルダ構成

```
backend/
├── config/                     # DB接続設定
│   └── db.js
├── middleware/                # 認証用ミドルウェア
│   ├── authMiddleware.js
│   └── adminMiddleware.js
├── models/                    # Mongooseスキーマ定義
│   ├── admin.js
│   ├── cart.model.js
│   ├── message.model.js
│   ├── order.model.js
│   ├── products.model.js
│   └── user.js
├── routes/                    # APIルーティング
│   ├── adminAuth.routes.js
│   ├── auth.routes.js
│   ├── cart.routes.js
│   ├── message.routes.js
│   ├── order.routes.js
│   ├── products.routes.js
│   └── userProfile.routes.js
├── validation/                # Joiによるバリデーション
│   ├── loginValidation.js
│   └── signupValidation.js
├── .env                       # 環境変数ファイル
├── index.js                   # エントリーポイント
└── package.json
```

---

## 🚀 開発環境構築手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/ayush6115/Ec-website
cd backend
```

### 2. 依存パッケージをインストール

```bash
npm install
```

### 3. 環境変数の設定

`backend/` フォルダ直下に `.env` ファイルを作成し、以下を追加：

```env
MONGO_URL=MongoDBの接続文字列
SECRET_KEY=JWT用のシークレットキー
```

### 4. サーバー起動

```bash
node index.js
# または開発用にnodemonを使用
npx nodemon index.js
```

サーバーは以下で起動します：  
📍 `http://localhost:5000`

---

## 🔒 認証（Authentication）

- **JWTトークン** による認証を使用しています（ユーザーと管理者の両方）。
- リクエスト時は `Authorization` ヘッダーに以下の形式で送信します：

```http
Authorization: Bearer <token>
```

---

## 🧪 入力バリデーション

- Joi によって、以下のバリデーションが行われます：
  - `signupValidation.js`：名前、電話番号、メール、パスワード
  - `loginValidation.js`：メール、パスワード

---

## 👤 ユーザーAPI (`/api`)

| エンドポイント        | メソッド | 説明                   | 認証必須 |
|------------------------|----------|------------------------|----------|
| `/signup`              | POST     | ユーザー登録           | ❌       |
| `/login`               | POST     | ユーザーログイン       | ❌       |
| `/profile`             | GET      | プロフィール取得       | ✅       |
| `/update-profile`      | PUT      | プロフィール更新       | ✅       |

---

## 🛒 カートAPI (`/api/cart`)

| エンドポイント  | メソッド | 説明                     | 認証必須 |
|------------------|----------|--------------------------|----------|
| `/add`           | POST     | カートに商品を追加       | ✅       |
| `/`              | GET      | カート情報を取得         | ✅       |
| `/update`        | PATCH    | 商品数量を更新           | ✅       |
| `/remove`        | DELETE   | 商品をカートから削除     | ✅       |

---

## 📦 注文API (`/api/order` または `/api/admin/orders`)

| エンドポイント      | メソッド | 説明                           | 認証必須           |
|----------------------|----------|----------------------------|--------------------|
| `/order`             | POST     | 注文を作成（ユーザー）       | ✅（ユーザー）      |
| `/orders`            | GET      | 全注文の取得（一覧）         | ✅（ユーザー/管理者）|
| `/orders/:id`        | PUT      | 注文ステータスを更新         | ✅（管理者）        |

---

## 📬 メッセージAPI (`/api/admin/message`)

| エンドポイント     | メソッド | 説明                           | 認証必須 |
|----------------------|----------|----------------------------|----------|
| `/message`           | POST     | お問い合わせ送信             | ❌       |
| `/message`           | GET      | メッセージ一覧取得（管理者）  | ✅       |
| `/message/:id`       | DELETE   | メッセージ削除              | ✅       |

---

## 🛍️ 商品API

### 🔧 管理者用API (`/api/admin`)

| エンドポイント              | メソッド | 説明                    | 認証必須    |
|-----------------------------|----------|-----------------------|------------|
| `/add-product`              | POST     | 新しい商品を追加       | ✅（管理者）|
| `/update-product/:id`       | PUT      | 商品情報を更新         | ✅（管理者）|
| `/products/:id`             | DELETE   | 商品を削除             | ✅（管理者）|

### 🌐 一般公開API (`/api`)

| エンドポイント                      | メソッド   | 説明                 |
|-------------------------------------|----------|--------------------- |
| `/products`                         | GET      | 全商品を取得          |
| `/products/:id`                     | GET      | 商品IDで取得          |
| `/products/category/men`           | GET       | メンズ商品一覧        |
| `/products/category/women`         | GET       | レディース商品一覧     |
| `/products/category/kids`          | GET       | キッズ商品一覧        |

---

## 🛡️ ミドルウェア

### `authMiddleware.js`

- ユーザーのJWTトークンを検証
- 成功時は `req.user` を付加

### `adminMiddleware.js`

- 管理者のトークンと権限を検証
- 成功時は `req.admin` を付加

---

## 🧬 モデル概要

### 1. ユーザー（`User`）

```js
{
  name,
  phone,
  email,
  password
}
```

### 2. 管理者（`Admin`）

```js
{
  name,
  phone,
  email,
  password
}
```

### 3. 商品（`Product`）

```js
{
  name,
  description,
  price,
  category,
  imageUrl,
  stock,
  createdAt
}
```

### 4. カート（`Cart`）

```js
{
  userId,
  items: [
    { productId, quantity }
  ]
}
```

### 5. 注文（`Order`）

```js
{
  userId,
  items,
  shippingInfo,
  paymentMethod,
  status
}
```

### 6. メッセージ（`Message`）

```js
{
  name,
  email,
  message
}
```

---

## 🧪 テストに便利なツール

- 🔍 **[Postman](https://www.postman.com/)** – APIテスト用
- ☁️ **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** – クラウドデータベースGUI
- 📋 **[JWT.io](https://jwt.io/)** – トークンのデコードと検証

---

## 🔮 今後の改善予定

- クラウドストレージを使った画像アップロード
- 商品一覧のページネーションとフィルター
- 管理者向けの分析ダッシュボード（グラフや指標表示）
- メール通知機能（注文確認、発送通知など）
- 権限管理の強化（RBAC）

---

## 👨‍💻 開発者

**Ayush Ranjan**  
GitHub: [@ayush6115](https://github.com/ayush6115)

---
