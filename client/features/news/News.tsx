import type { Article } from 'common/types/news'; // Article 型をインポート
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './news.module.css';

export const NewsComponent = () => {
  const [news, setNews] = useState<Article[]>([]); // 初期値を空の Article 配列に設定
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // エラーは文字列か null

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiClient.news.$post({
          body: { query: 'technology' },
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
