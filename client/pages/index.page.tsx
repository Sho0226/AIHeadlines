import { ChatComponent } from 'features/chat/Chat';
import { NewsComponent } from 'features/news/News';
import { Layout } from 'layouts/Layout';
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  return (
    <Layout
      render={() => (
        <div className={styles.container}>
          <ChatComponent setKeywords={setKeywords} />
          <NewsComponent />
        </div>
      )}
    />
  );
};

export default Home;
