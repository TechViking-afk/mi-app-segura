// tests/basic.test.js
const request = require('supertest');
const app = require('../app/src/index');

describe('Healthcheck', () => {
  it('GET / devuelve 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});