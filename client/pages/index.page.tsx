import { ChatComponent } from 'features/chat/Chat';
import { NewsComponent } from 'features/news/News';
import { Layout } from 'layouts/Layout';
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <Layout
      render={() => (
        <div className={styles.container}>
          <ChatComponent setKeyword={setKeyword} />
          {keyword && <NewsComponent query={keyword} />}
        </div>
      )}
    />
  );
};

export default Home;
