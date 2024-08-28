import type { Article } from 'common/types/news';
import { NEWS_KEY } from 'service/envValues';

export async function fetchTopHeadlines(query: string): Promise<Article[]> {
  try {
    const pageSize = 3;
    console.log('Fetching news with query:', query);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${NEWS_KEY}&category=${encodeURIComponent(query)}`,
    );

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`ニュースAPIの呼び出しに失敗しました: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data); // 取得したデータをログに出力

    if (!data.articles || data.articles.length === 0) {
      console.warn('No articles found for the given query.'); // 記事が見つからなかった場合の警告
    }

    return data.articles;
  } catch (error) {
    console.error('ニュースAPI呼び出し中にエラーが発生しました:', error);
    throw error;
  }
}
