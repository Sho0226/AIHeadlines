import { Chat } from 'features/chat/Chat';
import { News } from 'features/news/News';
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
        <Chat setKeyword={setKeyword} resetChat={resetChat} setResetChat={setResetChat} />
        {keyword && (
          <div className={styles.mixContainer}>
            <News query={keyword} />
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
