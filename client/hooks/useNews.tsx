import type { Article } from 'common/types/news';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import type { NewsProps } from 'utils/types';

export const useNews = ({ query }: NewsProps) => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const res = await apiClient.news.$post({
        body: { query },
      });
      const newsArticles: Article[] = Array.isArray(res.response) ? res.response : [res.response];
      setNews(newsArticles || []);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { news, loading, error };
};
