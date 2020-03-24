const app = require('../main/app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

/**
 * This is a sample test.
 * Use this format to create your tests.
 * const response = await request.METHOD(API_ENDPOINT);
 * then check the response.
 * then signify the test is done with: done()
 */
test('sample test, should succeed', async done => {
    const response = await request.get('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body).toBe('hello world');
    done();
});