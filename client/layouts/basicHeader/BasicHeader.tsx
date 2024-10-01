import { APP_NAME } from 'common/constants';
import styles from './BasicHeader.module.css';

export const BasicHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <span className={styles.appName}>{APP_NAME}</span>
      </div>
    </div>
  );
};
