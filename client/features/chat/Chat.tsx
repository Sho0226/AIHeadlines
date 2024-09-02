import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './chat.module.css';

export const ChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(''); // 初期は空
  const [isLoading, setIsLoading] = useState(false);

  // コンポーネントがマウントされたときに初期メッセージを取得
  useEffect(() => {
    const fetchInitialMessage = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.chat.$post({
          body: { question: '' }, // 空の質問を送信して初期メッセージを取得
        });
        console.log('Received initial response from API:', res.response);
        setResponse(res.response || 'No response received.');
      } catch (error) {
        console.error('Error fetching initial message:', error);
        setResponse('An error occurred while getting the initial message. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMessage();
  }, []); // 空の依存配列で一度だけ実行される

  const handleAskQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.$post({
        body: { question },
      });
      console.log('Received response from API:', res.response);
      setResponse(res.response || 'No response received.');
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        <div>
          <h3 className={styles.responseTitle}>Response:</h3>
          <p className={styles.responseText}>{response}</p>
        </div>
        <input
          className={styles.input}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question"
          disabled={isLoading}
        />
        <button
          className={styles.button}
          onClick={handleAskQuestion}
          disabled={isLoading || question.trim() === ''}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setQuestion('');
            setResponse('');
          }}
          disabled={isLoading}
        >
          Reset
        </button>
        <div className={styles.thinkingcircle} />
      </div>
    </div>
  );
};
