import type { DefineMethods } from 'aspida';
import type { newsProps } from 'common/types/news';

export type Methods = DefineMethods<{
  post: {
    reqBody: { query: string };
    resBody: { response: newsProps };
  };
}>;
