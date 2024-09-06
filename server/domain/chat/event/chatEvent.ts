import { openai } from 'service/openai';

export async function streamChatCompletion(question: string): Promise<string> {
  let responseText = '';

  try {
    if (!question) {
      return 'どんなニュースが読みたい？';
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: question },
        {
          role: 'assistant',
          content: 'この質問に関連するキーワードのみを三つ箇条書きで挙げてください。',
        },
      ],
      stream: true,
      max_tokens: 100,
      temperature: 0.7,
      frequency_penalty: 0.5,
    });

    for await (const chunk of stream) {
      responseText += chunk.choices[0]?.delta?.content || '';
    }

    console.log('Final response text:', responseText);
    return responseText;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    throw error;
  }
}
