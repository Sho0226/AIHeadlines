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
        { role: 'user', content: question },
        {
          role: 'assistant',
          content: `次のキーワードに関連する単語を8つ提供してください。それぞれの単語をハイフン（-）で区切ってください。キーワード: "${question}" 形式: 単語1 - 単語2 - 単語3。また、一度出た${question}は出力しないでください。`,
        },
      ],
      stream: true,
      max_tokens: 100,
      temperature: 0.7,
      frequency_penalty: 0.5,
    });

    // チャンクごとにデータを受信して蓄積
    for await (const chunk of stream) {
      responseText += chunk.choices[0]?.delta?.content || '';
    }

    console.log('Final response text:', responseText); // 最終的なテキストも表示

    return responseText;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    throw error;
  }
}
