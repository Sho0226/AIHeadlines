import Load from 'features/load/Load';
import { useNews } from 'hooks/useNews';
import { ExternalLink } from 'lucide-react';
import styles from './news.module.css';

export const News = ({ query }: { query: string }) => {
  const { news, loading, error } = useNews({ query });

  if (loading) return <Load />;
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
