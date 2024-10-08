import type { Article } from 'common/types/news';
import { fetchTopHeadlines } from 'domain/news/event/newsEvent';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    try {
      const responceNews: Article[] = await fetchTopHeadlines(body.query);
      return {
        status: 200,
        body: { response: responceNews },
      };
    } catch (error) {
      console.error('Error in fetchTopHeadslines:', error);
      return {
        status: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  },
}));
