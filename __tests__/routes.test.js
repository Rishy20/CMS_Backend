const request = require('supertest');
const server = require('../server');
const getClient = require('../dal/connection');

jest.setTimeout(30000);

beforeAll(async () => {
    await getClient();
});
afterAll(() => {
    console.log('Test completed');
});

describe('Test admin routes', () => {
    test('Test get admin route', async () => {
        const response = await request(server.callback()).get('/api/v1/admins/60b79961dc482c002eed9fd0');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
});

describe('Test editor routes', () => {
    test('Test get all editors route', async () => {
        const response = await request(server.callback()).get('/api/v1/editors');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
});

describe('Test reviewer routes', () => {
    test('Test get all reviewers route', async () => {
        const response = await request(server.callback()).get('/api/v1/reviewers');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
});

describe('Test researcher routes', () => {
    test('Test get all approved researchers route', async () => {
        const response = await request(server.callback()).get('/api/v1/researchers/approved');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
});

describe('Test workshop routes', () => {
    test('Test get all pending workshops route', async () => {
        const response = await request(server.callback()).get('/api/v1/workshops/pending');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
    test('Test get all approved workshops route', async () => {
        const response = await request(server.callback()).get('/api/v1/workshops/approved');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
});



describe('Test ticket routes', () => {
    test('Test get all tickets route', async () => {
        const response = await request(server.callback()).get('/api/v1/tickets');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
});

describe('Test login routes', () => {
    test('Test login route - handle user doesn\'t exist error', async () => {
        let login = {email: "doesnt@exist.com", password: "doesnt-exist"}

        const response = await request(server.callback()).post('/api/v1/login')
            .send(login);
        const responseText = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(responseText.auth).toBeFalsy();
        expect(responseText.message).toEqual('User not found');
    });

    test('Test admin login route - handle wrong password error', async () => {
        let login = {email: "lakshitha@yandex.com", password: "wrong-password"}

        const response = await request(server.callback()).post('/api/v1/login/admin')
            .send(login);
        const responseText = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(responseText.auth).toBeFalsy();
        expect(responseText.message).toEqual('Password is incorrect');
    });
});