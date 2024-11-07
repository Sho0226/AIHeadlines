import type { Article } from 'common/types/news';
import { NEWS_KEY } from 'service/envValues';

export async function fetchTopHeadlines(query: string): Promise<Article[]> {
  try {
    const pageSize = 3;

    // キーワード検索のみを行うURL
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&apiKey=${NEWS_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`ニュースAPIの呼び出しに失敗しました: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      console.warn('指定されたクエリに該当する記事が見つかりません。');
      return [];
    }

    return data.articles;
  } catch (error) {
    console.error('ニュースAPI呼び出し中にエラーが発生しました:', error);
    throw error;
  }
}
