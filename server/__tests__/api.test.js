'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('API Health Check', () => {
  it('GET /api/health should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('404 Handler', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toContain('not found');
  });
});

describe('Validation', () => {
  it('POST /api/chats should reject invalid body', async () => {
    const res = await request(app)
      .post('/api/chats')
      .send({ chat: { userID: 'invalid' } });
    expect(res.statusCode).toBe(422);
    expect(res.body.error).toBe('Validation failed');
    expect(res.body.details).toBeDefined();
  });

  it('POST /api/chats/messages should reject empty text', async () => {
    const res = await request(app)
      .post('/api/chats/messages')
      .send({ sms: { friendID: 1, myID: 1, _id: 1, text: '', type: 'send', idGlobal: 1 } });
    expect(res.statusCode).toBe(422);
  });

  it('POST /api/challenge should reject non-integer values', async () => {
    const res = await request(app)
      .post('/api/challenge')
      .send({ challenge: 'abc', user: 1 });
    expect(res.statusCode).toBe(422);
  });
});
