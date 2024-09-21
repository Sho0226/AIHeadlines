# AIHeadlines 🎉 [![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://aiheadlines.onrender.com/)

AIHeadlinesは、AIを活用してパーソナライズされたニュースを提供するアプリケーションです。キーワード検索や、ユーザーの好みに合わせたニュースのおすすめ機能を備えています。

## 🚀 Features

- **パーソナライズされたニュースフィード**: AIがあなたの好みに基づいて最新のニュースをお届けします。
- **高度なキーワード検索**: 特定のトピックに関連するニュースを簡単に検索できます。
- **AIによるニュース提案**: 関心のあるニュースをAIが自動で提案します。

## 🛠️ Technologies

# AIHeadlines 🎉

AIHeadlinesは、AIを活用してパーソナライズされたニュースを提供するアプリケーションです。

## 🛠️ 主要技術スタック

- **フルスタックテンプレート**: aspida と frourio を用いた TypeScript フルスタック
- **Frontend**: Next.js React
- **Backend**: Fastify Prisma
- **Database**: PostgreSQL
- **AI**: OpenAI API

## 🔗 Live Demo

👉 [Visit AIHeadlines](https://aiheadlines.onrender.com/) to see the app in action.

## 📦 Installation

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/Sho0226/AIHeadlines.git
   cd AIHeadlines
   ```

2. 必要な依存関係をインストールします。

   ```bash
   npm install
   npm install --prefix client
   npm install --prefix server
   ```

3. .envファイルを作成し、APIキーや環境設定を入力します。

   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

   server/.env ファイルに以下の変数を設定します。

   ```
   OPENAI_API_KEY=your_openai_api_key
   BASE_URL=your_base_url
   ```

4. Docker Compose を使用してプロジェクトを起動します。

   ```bash
   docker compose up -d
   ```

5. アプリケーションを起動します。

   ```bash
   npm run notios
   ```

6. http://localhost:3000 にアクセスして、アプリを確認します。

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
