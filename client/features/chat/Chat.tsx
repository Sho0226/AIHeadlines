import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './chat.module.css';

export const ChatComponent = ({
  setKeyword,
  resetChat,
  setResetChat,
}: {
  setKeyword: (keyword: string) => void;
  resetChat: boolean;
  setResetChat: (reset: boolean) => void;
}) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('ニュースデータのフィールドを選択してください');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // 回答済みかどうかの状態
  const [keywords, setLocalKeywords] = useState<string[]>([]); // 抽出したキーワードを保持するステート
  const [isNewsMode, setIsNewsMode] = useState(false);

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
    }
  };

  useEffect(() => {
    // リセットフラグがtrueの場合はチャットをリセット
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
        .split('-') // ハイフンで分割
        .map((item: string) => item.trim()) // 各項目の前後の空白を除去
        .filter((item: string) => item !== ''); // 空白行を除外

      setLocalKeywords(extractedKeywords); // キーワードをステートに保存

      setIsAnswered(true); // 回答済みにする
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
        .split('-') // ハイフンで分割
        .map((item: string) => item.trim()) // 各項目の前後の空白を除去
        .filter((item: string) => item !== ''); // 空白行を除外

      setIsAnswered(true); // 回答済み
      setLocalKeywords(extractedKeywords);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsCkick = (newsKeyword: string) => {
    setKeyword(newsKeyword);
    setIsNewsMode(true);
  };

  const renderAnsweredButtons = (keyword: string) => (
    <>
      <button className={styles.button} onClick={() => handleNewsCkick(keyword)}>
        {' '}
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
        disabled={isLoading}
      >
        再度選択
      </button>
    </>
  );

  const renderButtons = (keyword: string) => {
    return isAnswered ? renderAnsweredButtons(keyword) : renderNonAnsweredButtons();
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        {isNewsMode ? null : ( // ニュースモードの場合はニュースコンポーネントのみを表示 // チャット部分は表示しない
          <>
            {isAnswered ? (
              <div className={styles.keywordContainer}>
                {keywords.map((keyword, index) => (
                  <div key={index}>
                    <div className={styles.responseText}>{keyword}</div>
                    {renderButtons(keyword)}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className={styles.responseText}>{response}</div>
                <input
                  className={styles.input}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="ニュースデータを指定…"
                  disabled={isLoading}
                />
                {renderButtons('')}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
