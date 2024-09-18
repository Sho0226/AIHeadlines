import { streamChatCompletion } from '../../../server/domain/chat/event/chatEvent';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    try {
      const responseText = await streamChatCompletion(body.question);

      return {
        status: 200,
        body: { response: responseText },
      };
    } catch (error) {
      console.error('Error in streamChatCompletion:', error); // エラーが発生した場合のログ
      return {
        status: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  },
}));
