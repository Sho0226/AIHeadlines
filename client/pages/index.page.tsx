import { ChatComponent } from 'features/chat/Chat';
import { Layout } from 'layouts/Layout';
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [toggleState, setToggleState] = useState(0);

  const getImageName = () => {
    switch (toggleState) {
      case 0:
        return 'agree';
      case 1:
        return 'think';
      case 2:
        return 'amaze';
    }
  };
  return (
    <Layout
      render={() => (
        <div className={styles.container}>
          <ChatComponent />
          {/* <NewsComponent /> */}
          <div className={styles.image}>
            <img src={`/images/${getImageName()}.png`} style={{ height: '40vh' }} />
          </div>
        </div>
      )}
    />
  );
};

export default Home;
