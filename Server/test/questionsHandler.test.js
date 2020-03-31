const app = require('../main/app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

question_ids = {};

test('add first question test, should succeed', async done => {
    let question = {question_string: "This is the first question."};
    const response = await request.post('/api/v1/questions/add').send(question);
    expect(response.status).toBe(200);
    question_ids[question.question_string] = response.body[0].question_id;
    done();
});

test('add second question test, should succeed', async done => {
    let question = {question_string: "This is the second question."};
    const response = await request.post('/api/v1/questions/add').send(question);
    expect(response.status).toBe(200);
    question_ids[question.question_string] = response.body[0].question_id;
    done();
});


test('get all questions test, should succeed', async done => {
    const response = await request.get('/api/v1/questions/all');
    expect(response.status).toBe(200);
    expect(response.body.length > 0);
    done();
});


test('remove first question test, should succeed', async done => {
    const response = await request.post('/api/v1/questions/remove/' + question_ids["This is the first question."]);
    expect(response.status).toBe(200);
    done();
});

test('remove second question test, should succeed', async done => {
    const response = await request.post('/api/v1/questions/remove/' + question_ids["This is the second question."]);
    expect(response.status).toBe(200);
    done();
});