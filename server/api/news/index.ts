import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: { query: string };
    resBody: { response: string };
  };
}>;
