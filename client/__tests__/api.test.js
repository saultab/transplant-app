/**
 * Unit tests for the API client layer.
 * Tests the request wrapper's error handling behavior.
 */

// Mock fetch globally
global.fetch = jest.fn();

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: { hostUri: 'localhost:19000' },
  manifest: { debuggerHost: 'localhost:19000' },
}));

const API = require('../src/api/index').default;

describe('API Client', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getListChallenge', () => {
    it('returns challenge list on success', async () => {
      const mockData = [
        { id: 1, titolo: 'Walk 30 min', descrizione: 'Walk outside', hastag: '#health' },
      ];
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      });

      const result = await API.getListChallenge();
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('throws on server error', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Database error' }),
      });

      await expect(API.getListChallenge()).rejects.toThrow('Database error');
    });

    it('throws user-friendly message on network failure', async () => {
      fetch.mockRejectedValueOnce(new Error('Network request failed'));

      await expect(API.getListChallenge()).rejects.toThrow(
        'Unable to connect to server. Please check your connection.',
      );
    });
  });

  describe('addMessage', () => {
    it('sends correct payload', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ id: 1 }),
      });

      const sms = { friendID: 2, myID: 1, _id: 5, text: 'Hello', type: 'send', idGlobal: 10 };
      await API.addMessage(sms);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/chats/messages'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ sms }),
        }),
      );
    });
  });

  describe('deleteMessage', () => {
    it('calls DELETE with correct URL params', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      await API.deleteMessage(5, 2);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/chats/messages/5/2'),
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });
});
