const app = require('../main/app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

const user = {title: "Mr.", first_name: "Edward", last_name: "Cunningham", preferred_first_name: "Eddie",
    user_name: "ecunnin2", email: "ecunnin2@nd.edu", password: "password", user_type: "student", institution: "Notre Dame"};

const user_credentials = {email: "ecunnin2@nd.edu", password: "password"};


/**
 * Test User Creation
 */
test('creates new user, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(user);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(user.email);
    done();
});

test('creates duplicate user, should fail', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(user);
    expect(response.status).toBe(200);
    expect(response.body.dbError.length).toBeGreaterThan(0);
    expect(response.body.dbError).toContain('Email is already taken');
    done();
});

/**
 * Test User Authentication
 */
test('tests user authentication, should succeed', async done => {
    const response = await request.post('/api/v1/users/authenticate')
        .send(user_credentials);
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(user.email);
    done();
});

test('tests user authentication, should fail', async done => {
    user_credentials.password = "wrong_password";

    const response = await request.post('/api/v1/users/authenticate')
        .send(user_credentials);
    expect(response.status).toBe(200);
    expect(response.body.error).toContain('Wrong password');
    done();
});

test('tests password change', async done => {
    const change_user = {password: "wrong_password"};

    const passwordChangeResponse = await request.post('/api/v1/users/update/basic/'+user.user_name)
        .send(change_user);
    expect(passwordChangeResponse.status).toBe(200);

    user_credentials.password = "wrong_password";
    const authenticationResponse = await request.post('/api/v1/users/authenticate')
        .send(user_credentials);

    expect(authenticationResponse.status).toBe(200);
    expect(authenticationResponse.body.email).toBe(user.email);
    done();
});

/**
 * Test retrieval of User
 */
test('tests retrieval of user, should succeed', async done => {
    const response = await request.get('/api/v1/users/get/'+user.user_name)
        .send(user_credentials);
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(user.email);
    done()
});

test('tests user authentication, should fail', async done => {
    const response = await request.get('/api/v1/users/get/unknown')
        .send(user_credentials);
    expect(response.status).toBe(200);
    expect(response.body.dbError).toContain('There is no used that exists');
    done()
});


/**
 * Test Updating Basic Information of a user
 */
test('tests update basic user data, should succeed', async done => {
    const update_user = {preferred_first_name: "newPreferredName"};
    const response = await request.post('/api/v1/users/update/basic/'+user.user_name)
        .send(update_user);
    expect(response.status).toBe(200);
    expect(response.body.preferred_first_name).toBe("newPreferredName");
    done()
});


/**
 * Test Updating Survey Information of a user
 */
test('tests update user survey data, should succeed', async done => {
    const update_user = {
        "Q1": "1", "Q2": "1", "Q3": "1", "Q4": "1", "Q5": "1",
        "Q6": "1", "Q7": "8", "Q8": "9", "Q9": "10", "Q10": "1",
    };
    const response = await request.post('/api/v1/users/update/survey/'+user.user_name)
        .send(update_user);
    expect(response.status).toBe(200);
    done()
});

/**
 * Test Updating Survey Information of a user
 */
test('tests update user survey data, should succeed', async done => {
    const update_user = {"Q1": "1", "Q2": "1"};
    const response = await request.post('/api/v1/users/update/survey/'+user.user_name)
        .send(update_user);
    expect(response.status).toBe(200);
    done()
});


/**
 * Test Deleting a user
 */
test('delete user, should succeed', async done => {
    const deleteResponse = await request.delete('/api/v1/users/delete/'+user.user_name);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.success).toBe('users deleted: 1');
    done()
});
