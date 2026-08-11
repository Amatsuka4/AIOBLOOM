# AIOBLOOM

**All-In-One BLOOM** — Discord の Bot に自分が欲しい・使いたいと思った機能を実装するリポジトリです。

## セットアップ

### 前提条件

- [Node.js](https://nodejs.org/)
- Discord Application Bot トークン

### 1. リポジトリのクローン

```bash
git clone https://github.com/Amatsuka4/AIOBLOOM.git
cd AIOBLOOM
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

プロジェクトのルートに `.env` を作成し、Discord Bot トークンを設定。

```env
DISCORD_TOKEN=your_discord_bot_token_here
```

### 4. 起動

**開発時**

```bash
npm run dev
```

**本番ビルド & 起動**

```bash
npm run build
npm start
```

## ライセンス

未定
