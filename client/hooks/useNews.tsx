import type { Article } from 'common/types/news';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';

export const useNews = ({ query }: { query: string }) => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiClient.news.$post({
          body: { query },
        });
        console.log('Received response from API:', res.response);
        const newsArticles: Article[] = Array.isArray(res.response) ? res.response : [res.response];
        setNews(newsArticles || []);
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  return { news, loading, error };
};
