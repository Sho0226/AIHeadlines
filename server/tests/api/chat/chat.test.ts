import { expect, test } from 'vitest';
import { createSessionClients, noCookieClient } from '../apiClient';
import { POST } from '../utils';

test(POST(noCookieClient.chat), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.chat.$post({
    body: {
      question: 'What is AI?',
    },
  });
  expect(res).toMatchObject({
    response: expect.stringContaining('機械学習'),
  });
});
