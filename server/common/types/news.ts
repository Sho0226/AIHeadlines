export type Article = {
  author: string; // 記事の著者
  title: string; // 記事のタイトル
  publishedAt: string; // 記事の公開日（ISO 8601形式の文字列）
  url: string; // 記事のURL（Webページのリンク）
  urlToImage: string; // 記事に関連する画像のURL
  content: string; // 記事の内容
  description: string; // 記事の短い説明や要約
};
