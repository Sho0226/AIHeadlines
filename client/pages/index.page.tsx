import { ChatComponent } from 'features/chat/Chat';
import { NewsComponent } from 'features/news/News';
import { Layout } from 'layouts/Layout';
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [resetChat, setResetChat] = useState(false);

  const handleResetChat = () => {
    setKeyword('');
    setResetChat(true);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <ChatComponent setKeyword={setKeyword} resetChat={resetChat} setResetChat={setResetChat} />
        {keyword && (
          <div className={styles.mixContainer}>
            <NewsComponent query={keyword} />
            <button onClick={handleResetChat} className={styles.resetButton}>
              リフレッシュして再開
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
