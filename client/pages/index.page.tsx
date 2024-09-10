import { ChatComponent } from 'features/chat/Chat';
import { Layout } from 'layouts/Layout';
import styles from './index.module.css';

const Home = () => {
  return (
    <Layout
      render={() => (
        <div className={styles.container}>
          <ChatComponent />
          {/* <NewsComponent /> */}
        </div>
      )}
    />
  );
};

export default Home;
