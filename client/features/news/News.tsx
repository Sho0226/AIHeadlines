import type { Article } from 'common/types/news';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './news.module.css';

export const NewsComponent = ({ query }: { query: string }) => {
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
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.newsContainer}>
      <h1>Latest News</h1>
      <ul className={styles.newsList}>
        {news.map((article, index) => (
          <li key={index} className={styles.newsItem}>
            <p className={styles.newsAuthor}>{article.author}</p>
            <p className={styles.newsAuthor}>{article.title}</p>
            <p className={styles.newsAuthor}>{article.publishedAt}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.newsLink}
            >
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
