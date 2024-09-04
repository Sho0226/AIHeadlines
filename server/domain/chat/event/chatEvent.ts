import { openai } from 'service/openai';

export async function streamChatCompletion(question: string): Promise<string> {
  let responseText = '';
  try {
    // First, ask the user to input what kind of news they are interested in.
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: 'どんなニュースが読みたい？',
        },
        { role: 'user', content: question }, // The user provides their preferred news genre
      ],
      stream: true,
      max_tokens: 100,
      temperature: 0.7,
      frequency_penalty: 0.5,
    });

    // Collect the first response (the AI's response based on the user's question)
    for await (const chunk of stream) {
      console.log('Received chunk:', chunk);
      responseText += chunk.choices[0]?.delta?.content || '';
    }

    // Now we ask for 3 specific related keywords based on the user's genre input
    console.log('Received full response from stream:', responseText);

    const keywordResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `次に、${responseText} に関して、もっと具体的なキーワードを3つ挙げてください。具体的なトピックや話題に基づくものにしてください。`,
        },
      ],
      max_tokens: 50,
      temperature: 0.7,
    });

    // Get the specific related keywords from the response
    const keywordText =
      keywordResponse.choices[0]?.message?.content || 'キーワードが見つかりませんでした。';

    console.log('Keywords:', keywordText);
    return keywordText;
  } catch (error) {
    console.error('Error while calling OpenAI API:', error);
    throw error;
  }
}
