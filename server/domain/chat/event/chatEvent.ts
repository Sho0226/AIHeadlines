import { openai } from 'service/openai';

export async function streamChatCompletion(question: string): Promise<string> {
  let responseText = '';

  try {
    if (!question) {
      return 'ニュースデータのフィールドを選択してください';
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '関連キーワードを生成する専門家として、明確で関連性の高い単語を提供してください。',
        },
        {
          role: 'user',
          content: `キーワード「${question}」の内容を具体的に掘り下げた8つの単語を提供してください。${question}は提供しないでください。`,
        },
        {
          role: 'assistant',
          content:
            '以下の形式で出力します：\n単語1 - 単語2 - 単語3 - 単語4 - 単語5 - 単語6 - 単語7 - 単語8',
        },
      ],
      stream: true,
      max_tokens: 150,
      temperature: 0.3,
      presence_penalty: 0.1,
      frequency_penalty: 0.3,
    });

    // チャンクごとにデータを受信して蓄積
    for await (const chunk of stream) {
      responseText += chunk.choices[0]?.delta?.content || '';
    }

    return responseText;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    throw error;
  }
}
