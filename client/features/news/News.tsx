import type { Article } from 'common/types/news';
import { ExternalLink } from 'lucide-react';
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
  }, [query]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.newsContainer}>
      <div className={styles.highlights}>
        <h1>News Highlights</h1>
      </div>
      <ul className={styles.newsList}>
        {news.map((article, index) => (
          <li key={index} className={styles.newsItem}>
            <img
              src={article.urlToImage || '/placeholder.svg?height=200&width=300'}
              alt={article.title}
              className={styles.newsImage}
            />
            <h2 className={styles.newsTitle}>{article.title}</h2>
            <p className={styles.newsAuthor}>{article.author}</p>
            <p className={styles.newsPublishedAt}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.newsLink}
            >
              Read more
              <ExternalLink className={styles.linkIcon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
