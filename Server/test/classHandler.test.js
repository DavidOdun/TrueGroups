const app = require('../main/app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

const professor = {title: "Mr.", first_name: "Professor", last_name: "Cunningham", preferred_first_name: "Prof",
    user_name: "profMan", email: "profEmail@nd.edu", password: "password", user_type: "professor", institution: "Notre Dame"};


const student = {title: "Mr.", first_name: "Student", last_name: "Cunningham", preferred_first_name: "student",
    user_name: "stuMan", email: "stuEmail@nd.edu", password: "password", user_type: "student", institution: "Notre Dame"};

var professor_id = 0;
var student_id = 0;
var class_code = 0;

test('creates new professor, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(professor);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(professor.email);
    professor_id = response.body[0].id;
    done();
});

test('creates new student, should succeed', async done => {
    const response = await request.put('/api/v1/users/create')
        .send(student);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].email).toBe(student.email);
    student_id = response.body[0].id;
    done();
});

test('create class test, should succeed', async done => {
    let new_class = {professor_id: professor_id, class_name: "Data Structures", max_members: "50"};
    const response = await request.put('/api/v1/classes/create')
        .send(new_class);
    expect(response.status).toBe(200);
    class_code = response.body[0].class_code;
    done();
});

test('join class test, should succeed', async done => {
    let join_class = {professor_id: professor_id, class_name: "Data Structures", user_id: student_id};
    const response = await request.post('/api/v1/classes/join').send(join_class);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toContain("Success");
    done();
});

test('delete class members, should succeed', async done => {
    let class_details = {class_code: class_code, member_id: student_id};
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
    const deleteResponse = await request.delete('/api/v1/users/delete/'+student.user_name);
    expect(deleteResponse.status).toBe(200);
    done()
});
