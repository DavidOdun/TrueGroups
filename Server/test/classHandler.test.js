const app = require('../main/app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

const professor = {title: "Mr.", first_name: "Professor", last_name: "Cunningham", preferred_first_name: "Prof",
    user_name: "profMan", email: "profEmail@nd.edu", password: "password", user_type: "professor", institution: "Notre Dame"};


const student_one = {title: "Mr.", first_name: "Student", last_name: "One", preferred_first_name: "one",
    user_name: "one", email: "one@nd.edu", password: "password", user_type: "student", institution: "Notre Dame"};

const student_two = {title: "Mrs.", first_name: "Student", last_name: "Two", preferred_first_name: "two",
    user_name: "two", email: "two@nd.edu", password: "password", user_type: "student", institution: "Notre Dame"};

const student_three = {title: "Mr.", first_name: "Student", last_name: "Three", preferred_first_name: "three",
    user_name: "three", email: "three@nd.edu", password: "password", user_type: "student", institution: "Notre Dame"};

const student_four = {title: "Mrs.", first_name: "Student", last_name: "Four", preferred_first_name: "four",
    user_name: "four", email: "four@nd.edu", password: "password", user_type: "student", institution: "Notre Dame"};

const student_five = {title: "Mr.", first_name: "Student", last_name: "Five", preferred_first_name: "five",
    user_name: "five", email: "five@nd.edu", password: "password", user_type: "student", institution: "Notre Dame"};


var professor_id = 0;
var student_one_id = 0;
var student_two_id = 0;
var student_three_id = 0;
var student_four_id = 0;
var student_five_id = 0;
var class_code = 0;

/**
 * Create the professor
 */
test('creates new professor, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(professor);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(professor.email);
    professor_id = response.body[0].id;
    done();
});

/**
 * Create five students.
 */
test('creates new student, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(student_one);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(student_one.email);
    student_one_id = response.body[0].id;
    done();
});

test('creates new student, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(student_two);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(student_two.email);
    student_two_id = response.body[0].id;
    done();
});

test('creates new student, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(student_three);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(student_three.email);
    student_three_id = response.body[0].id;
    done();
});

test('creates new student, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(student_four);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(student_four.email);
    student_four_id = response.body[0].id;
    done();
});

test('creates new student, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(student_five);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(student_five.email);
    student_five_id = response.body[0].id;
    done();
});

/**
 * Create the class
 */
test('create class test, should succeed', async done => {
    let new_class = {professor_id: professor_id, class_name: "Data Structures", max_members: "50"};
    const response = await request.put('/api/v1/classes/create')
        .send(new_class);
    expect(response.status).toBe(200);
    class_code = response.body[0].class_code;
    done();
});

/**
 * Get the class details
 */
test('get class details test, should succeed', async done => {
    const response = await request.get('/api/v1/classes/details/' + class_code);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0][class_code] === class_code);
    done();
});


/**
 * Have the students join the class
 */
test('join class test, should succeed', async done => {
    let join_class = {professor_id: professor_id, class_name: "Data Structures", user_id: student_one_id};
    const response = await request.post('/api/v1/classes/join').send(join_class);
    expect(response.status).toBe(200);
    expect(response.body.success).toContain("Success");
    done();
});

test('join class test, should succeed', async done => {
    let join_class = {professor_id: professor_id, class_name: "Data Structures", user_id: student_two_id};
    const response = await request.post('/api/v1/classes/join').send(join_class);
    expect(response.status).toBe(200);
    expect(response.body.success).toContain("Success");
    done();
});

test('join class test, should succeed', async done => {
    let join_class = {professor_id: professor_id, class_name: "Data Structures", user_id: student_three_id};
    const response = await request.post('/api/v1/classes/join').send(join_class);
    expect(response.status).toBe(200);
    expect(response.body.success).toContain("Success");
    done();
});

test('join class test, should succeed', async done => {
    let join_class = {professor_id: professor_id, class_name: "Data Structures", user_id: student_four_id};
    const response = await request.post('/api/v1/classes/join').send(join_class);
    expect(response.status).toBe(200);
    expect(response.body.success).toContain("Success");
    done();
});

test('join class test, should succeed', async done => {
    let join_class = {professor_id: professor_id, class_name: "Data Structures", user_id: student_five_id};
    const response = await request.post('/api/v1/classes/join').send(join_class);
    expect(response.status).toBe(200);
    expect(response.body.success).toContain("Success");
    done();
});


/**
 * Get the the classes that student_one is enrolled in.
 */
test('get all of the classes that a user is enrolled in test, should succeed', async done => {
    const response = await request.get('/api/v1/classes/enrolled/' + student_one_id);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].member_id == student_one_id);
    done();
});

/**
 * Get the class details
 */
test('get class details test, should succeed', async done => {
    const response = await request.get('/api/v1/classes/details/' + class_code);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0][class_code] === class_code);
    done();
});


test('make groups within a class test, should succeed', async done => {
    const class_details = {class_name: "Data Structures", project_name: "CC5"};
    const response = await request.post('/api/v1/classes/makeGroups/' + class_code).send(class_details);
    expect(response.status).toBe(200);
    expect(response.body.groups.length > 0);
    done();
});

test('get all of the groups for a particular class test, should succeed', async done => {
    const response = await request.get('/api/v1/classes/allGroups/' + class_code);
    expect(response.status).toBe(200);
    done();
});

test('get the group that a student is in for a particular class test, should succeed', async done => {
    const response = await request.get('/api/v1/classes/students/' + class_code + "/" + student_one_id);
    expect(response.status).toBe(200);
    done();
});

/**
 * Cleanup
 */
test('delete class members, should succeed', async done => {
    let class_details = {class_code: class_code, member_id: student_one_id};
    const deleteResponse = await request.delete('/api/v1/classes/members/delete').send(class_details);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete class members, should succeed', async done => {
    let class_details = {class_code: class_code, member_id: student_two_id};
    const deleteResponse = await request.delete('/api/v1/classes/members/delete').send(class_details);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete class members, should succeed', async done => {
    let class_details = {class_code: class_code, member_id: student_three_id};
    const deleteResponse = await request.delete('/api/v1/classes/members/delete').send(class_details);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete class members, should succeed', async done => {
    let class_details = {class_code: class_code, member_id: student_four_id};
    const deleteResponse = await request.delete('/api/v1/classes/members/delete').send(class_details);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete class members, should succeed', async done => {
    let class_details = {class_code: class_code, member_id: student_five_id};
    const deleteResponse = await request.delete('/api/v1/classes/members/delete').send(class_details);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete class, should succeed', async done => {
    let class_details = {class_code: class_code, class_name: "", professor_id: ""};
    const deleteResponse = await request.delete('/api/v1/classes/delete').send(class_details);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete user, should succeed', async done => {
    const deleteResponse = await request.delete('/api/v1/users/delete/'+professor.user_name);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete user, should succeed', async done => {
    const deleteResponse = await request.delete('/api/v1/users/delete/'+student_one.user_name);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete user, should succeed', async done => {
    const deleteResponse = await request.delete('/api/v1/users/delete/'+student_two.user_name);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete user, should succeed', async done => {
    const deleteResponse = await request.delete('/api/v1/users/delete/'+student_three.user_name);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete user, should succeed', async done => {
    const deleteResponse = await request.delete('/api/v1/users/delete/'+student_four.user_name);
    expect(deleteResponse.status).toBe(200);
    done()
});

test('delete user, should succeed', async done => {
    const deleteResponse = await request.delete('/api/v1/users/delete/'+student_five.user_name);
    expect(deleteResponse.status).toBe(200);
    done()
});
