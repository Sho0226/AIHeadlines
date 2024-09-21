import { useEffect, useState } from 'react';
import styles from './loading.module.css'; // スタイルも正しいパスでインポート

export default function Load() {
  // コンポーネント名を変更
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 6, 100);
        return newProgress;
      });
    }, 50);

    if (progress === 100) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer); // クリーンアップ関数でインターバルをクリア
    };
  }, [progress]);

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.progressText}>{progress}%</div>
      <div className={styles.statusText}>System Initializing...</div>
      <div className={styles.srOnly} role="status" aria-live="assertive">
        Loading, {progress} percent complete
      </div>
    </div>
  );
}
