const request = require('supertest');
const server = require('../../index');

describe('Index Route', () => {

    beforeAll(async () => {
        await server.close();
    });

    afterAll(async () => {
        await server.close();
    });

    test('GET / should respond with "Hello, World!"', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, World!');
    });
})