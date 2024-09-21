import { ChatComponent } from 'features/chat/Chat';
import { NewsComponent } from 'features/news/News';
import { Layout } from 'layouts/Layout';
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [resetChat, setResetChat] = useState(false);

  const handleResetChat = () => {
    setKeyword(''); // ニュースを非表示にするためキーワードをクリア
    setResetChat(true); // チャットリセットフラグをtrueに設定
  };

  return (
    <Layout
      render={() => (
        <div className={styles.container}>
          <ChatComponent
            setKeyword={setKeyword}
            resetChat={resetChat}
            setResetChat={setResetChat}
          />
          {keyword && (
            <div className={styles.mixContainer}>
              <NewsComponent query={keyword} />
              <button onClick={handleResetChat} className={styles.resetButton}>
                リフレッシュして再開
              </button>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default Home;
