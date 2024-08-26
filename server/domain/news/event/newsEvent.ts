import type { Article } from 'common/types/news';
import { NEWS_KEY } from 'service/envValues';

export async function fetchTopHeadlines(query: string): Promise<Article[]> {
  try {
    const pageSize = 5;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${NEWS_KEY}&q=${encodeURIComponent(query)}`,
    );
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error while caling News API:', error);
    throw error;
  }
}
