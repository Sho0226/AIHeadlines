import { openai } from 'service/openai';

export async function streamChatCompletion(question: string): Promise<string> {
  let responseText = '';
  try {
    const firstQuestion = 'どのニュースが読みたい？/※これと同じように出力して';
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'assistant', content: firstQuestion },
        { role: 'user', content: question },
      ],
      stream: true,
      max_tokens: 100,
      temperature: 0.7,
      frequency_penalty: 0.5,
    });

    console.log('Stream started');

    for await (const chunk of stream) {
      console.log('Received chunk:', chunk);
      responseText += chunk.choices[0]?.delta?.content || '';
    }

    console.log('Final response text:', responseText);
    return responseText;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    throw error;
  }
}
