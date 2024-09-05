import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './chat.module.css';

export const ChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('どんなニュースが読みたい？');
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialMessage = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.$post({
        body: { question: '' },
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

  useEffect(() => {
    fetchInitialMessage();
  }, []);

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
            }}
            disabled={isLoading}
          >
            考え直す
          </button>
        </div>
        <div className={styles.thinkingBigCircle} />
        <div className={styles.thinkingSmallCircle} />
      </div>
    </div>
  );
};
