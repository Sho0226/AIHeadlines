import styles from 'features/chat/chat.module.css';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import type { ChatProps } from 'utils/types';

export const useChat = ({ setKeyword, resetChat, setResetChat }: ChatProps) => {
  const [question, setQuestion] = useState(''); // 質問の状態
  const [response, setResponse] = useState('ニュースデータのフィールドを選択してください'); // レスポンスの状態
  const [isLoading, setIsLoading] = useState(false); // ローディング状態
  const [isAnswered, setIsAnswered] = useState(false); // 回答済みかどうかの状態
  const [keywords, setLocalKeywords] = useState<string[]>([]); // キーワードを保持
  const [isNewsMode, setIsNewsMode] = useState(false); // ニュースモードかどうかの状態

  const fetchInitialMessage = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.$post({
        body: { question: '' },
      });
      setResponse(res.response || 'No response received.');
      setQuestion(''); // questionをリセット
    } catch (error) {
      console.error('Error fetching initial message:', error);
      setResponse('An error occurred while getting the initial message. Please try again.');
    } finally {
      setIsLoading(false);
      setIsAnswered(false); // 回答済みをリセット
    }
  };

  useEffect(() => {
    if (resetChat) {
      fetchInitialMessage();
      setIsNewsMode(false);
      setResetChat(false); // リセット後にフラグを戻す
    }
  }, [resetChat]);

  const handleAskQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.$post({
        body: { question },
      });
      setResponse(res.response || 'No response received.');

      const extractedKeywords = res.response
        .split('-')
        .map((item: string) => item.trim())
        .filter((item: string) => item !== '');

      setLocalKeywords(extractedKeywords);
      setIsAnswered(true); // 回答済み
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeywordClick = async (keyword: string) => {
    setIsLoading(true);
    setQuestion(keyword); // 選択されたキーワードをセット
    try {
      const res = await apiClient.chat.$post({
        body: { question: keyword },
      });
      setResponse(res.response || 'No response received.');
      const extractedKeywords = res.response
        .split('-')
        .map((item: string) => item.trim())
        .filter((item: string) => item !== '');

      setIsAnswered(true);
      setLocalKeywords(extractedKeywords);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsClick = (newsKeyword: string) => {
    setKeyword(newsKeyword);
    setIsNewsMode(true);
  };

  const renderAnsweredButtons = (keyword: string) => (
    <>
      <button className={styles.button} onClick={() => handleNewsClick(keyword)}>
        {isLoading ? 'データを解析中…' : 'データを確定'}
      </button>
      <button
        className={styles.button}
        onClick={() => handleKeywordClick(keyword)}
        disabled={isLoading || keyword.trim() === ''}
      >
        {isLoading ? 'データを解析中…' : '詳細を表示'}
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setQuestion('');
          fetchInitialMessage();
        }}
        disabled={isLoading}
      >
        再度選択
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
        {isLoading ? 'データを解析中…' : '詳細を表示'}
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setQuestion('');
          fetchInitialMessage();
        }}
        disabled={isLoading || question.trim() === ''}
      >
        再度選択
      </button>
    </>
  );

  const renderButtons = (keyword: string = '') => {
    return isAnswered ? renderAnsweredButtons(keyword) : renderNonAnsweredButtons();
  };

  return {
    question,
    setQuestion,
    response,
    keywords,
    isAnswered,
    isLoading,
    isNewsMode,
    renderButtons,
  };
};
