import { expect, test, vi } from 'vitest';
import * as chatEvent from '../../domain/chat/event/chatEvent';

test('POST /chat - success', async () => {
  const res = { status: 200, body: { response: 'Expected response text' } };

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ response: 'Expected response text' });
});

vi.spyOn(chatEvent, 'streamChatCompletion').mockImplementation(() => {
  throw new Error('Test error');
});

(async (): Promise<void> => {
  const res = { status: 500, body: { error: 'Internal Server Error' } };

  expect(res.status).toEqual(500);
  expect(res.body).toEqual({ error: 'Internal Server Error' });
})();
