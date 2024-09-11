import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './chat.module.css';

export const ChatComponent = ({ setKeywords }: { setKeywords: (keywords: string[]) => void }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('どんなニュースが読みたい？');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // 回答済みかどうかの状態
  const [keywords, setLocalKeywords] = useState<string[]>([]); // 抽出したキーワードを保持するステート
  const [toggleState, setToggleState] = useState(0);

  const fetchInitialMessage = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.$post({
        body: { question: '' },
      });
      setResponse(res.response || 'No response received.');
    } catch (error) {
      console.error('Error fetching initial message:', error);
      setResponse('An error occurred while getting the initial message. Please try again.');
    } finally {
      setIsLoading(false);
      setIsAnswered(false); // 回答済みをリセット
      setToggleState(0); // 画像を初期化
    }
  };

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const handleAskQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.$post({
        body: { question },
      });
      setResponse(res.response || 'No response received.');

      const extractedKeywords = res.response
        .split('-') // ハイフンで分割
        .map((item: string) => item.trim()) // 各項目の前後の空白を除去
        .filter((item: string) => item !== ''); // 空白行を除外

      setLocalKeywords(extractedKeywords); // キーワードをステートに保存
      setKeywords(extractedKeywords);
      setIsAnswered(true); // 回答済みにする
      setToggleState(2); // 画像を"amaze"に変更
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderAnsweredButtons = () => (
    <>
      <button
        className={styles.button}
        onClick={handleAskQuestion}
        disabled={isLoading || question.trim() === ''}
      >
        {isLoading ? '考え中...' : 'これにする'}
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setQuestion('');
          fetchInitialMessage();
          setToggleState(1); // 状況に応じて"think"の画像に設定
        }}
        disabled={isLoading}
      >
        もう一度考え直す
      </button>
    </>
  );

  const renderNonAnsweredButtons = () => (
    <>
      <button
        className={styles.button}
        onClick={handleAskQuestion}
        disabled={isLoading || question.trim() === ''}
      >
        {isLoading ? '考え中...' : 'もっと詳しく'}
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setQuestion('');
          fetchInitialMessage();
          setToggleState(1); // 状況に応じて"think"の画像に設定
        }}
        disabled={isLoading}
      >
        もう一度考え直す
      </button>
    </>
  );

  const renderButtons = () => {
    return isAnswered ? renderAnsweredButtons() : renderNonAnsweredButtons();
  };

  const getImageName = () => {
    switch (toggleState) {
      case 0:
        return 'agree';
      case 1:
        return 'think';
      case 2:
        return 'amaze';
      default:
        return 'agree'; // デフォルト画像を指定
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        {isAnswered ? (
          <div className={styles.keywordContainer}>
            {keywords.map((keyword, index) => (
              <div className={styles.thinkingCircle} key={index}>
                <div className={styles.responseText}>{keyword}</div>
                {renderButtons()}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.thinkingCircle}>
            <div className={styles.responseText}>{response}</div>
            <input
              className={styles.input}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question"
              disabled={isLoading}
            />
            {renderButtons()}
          </div>
        )}
        <div className={styles.thinkingBigCircle} />
        <div className={styles.thinkingSmallCircle} />
      </div>
      <div className={styles.image}>
        <img src={`/images/${getImageName()}.png`} style={{ height: '40vh' }} />
      </div>
    </div>
  );
};
