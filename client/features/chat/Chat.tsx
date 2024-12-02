import Load from 'features/load/Load';
import { useChat } from 'hooks/useChat';
import React from 'react';
import type { ChatProps } from 'utils/types';
import styles from './chat.module.css';

export const Chat: React.FC<ChatProps> = ({ setKeyword, resetChat, setResetChat }) => {
  const {
    isNewsMode,
    keywords,
    renderButtons,
    response,
    question,
    setQuestion,
    isAnswered,
    isLoading,
  } = useChat({
    setKeyword,
    resetChat,
    setResetChat,
  });

  if (isLoading) return <Load />;

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
