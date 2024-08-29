import { openai } from 'service/openai';

export async function streamChatCompletion(question: string): Promise<string> {
  let responseText = '';
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'assistant', content: 'a' },
        { role: 'user', content: question }, // ユーザーが入力する質問
      ],
      stream: true,
      max_tokens: 10,
      temperature: 0.7,
      frequency_penalty: 0.5,
    });

    for await (const chunk of stream) {
      responseText += chunk.choices[0]?.delta?.content || '';
    }
    return responseText;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    throw error;
  }
}
