import type { DefineMethods } from 'aspida';
import type { Article } from 'common/types/news';

export type Methods = DefineMethods<{
  post: {
    reqBody: { query: string };
    resBody: { response: Article[] };
  };
}>;
