var express = require('express');
var router = express.Router();
var pool = require('./db');

// Controllers - The db queries
const userHandler = require('./components/userHandler');
const classHandler = require('./components/classHandler');
const questionHandler = require('./components/questionsHandler');

/*
    API POST ROUTES BELOW
*/
router.get('/api/hello', function (req, res) {res.json('hello world')});

// API Endpoints
// User Related
router.put('/api/v1/users/create', (req, res) => userHandler.createUser(req, res, db));
router.post('/api/v1/users/authenticate', (req, res) => userHandler.authenticateUser(req, res, db));
router.get('/api/v1/users/get/:user_name', (req, res) => userHandler.getUser(req, res, db));
router.post('/api/v1/users/update/basic/:user_name', (req, res) => userHandler.updateBasicUserInfo(req, res, db));
router.post('/api/v1/users/update/survey/:user_name', (req, res) => userHandler.updateSurveyUserInfo(req, res, db));
router.delete('/api/v1/users/delete/:user_name', (req, res) => userHandler.deleteUser(req, res, db));

// Class and Group Related
router.put('/api/v1/classes/create', (req, res) => classHandler.createClass(req, res, db));
router.post('/api/v1/classes/join', (req, res) => classHandler.joinClass(req, res, db));
router.get('/api/v1/classes/enrolled/:user_id', (req, res) => classHandler.getUserEnrolledClasses(req, res, db));
router.get('/api/v1/classes/details/:class_code', (req, res) => classHandler.getClassDetails(req, res, db));
router.post('/api/v1/classes/makeGroups/:class_code', (req, res) => classHandler.createGroups(req, res, db));
router.get('/api/v1/classes/allGroups/:class_code', (req, res) => classHandler.getAllClassesGroups(req, res, db));
router.get('/api/v1/classes/students/:class_code/:user_id', (req, res) => classHandler.getStudentsClassGroup(req, res, db));
router.delete('/api/v1/classes/delete', (req, res) => classHandler.deleteClass(req, res, db));
router.delete('/api/v1/classes/members/delete', (req, res) => classHandler.deleteClassMembers(req, res, db));

// Questions Related
router.post('/api/v1/questions/add', (req, res) => questionHandler.addQuestion(req, res, db));
router.get('/api/v1/questions/all', (req, res) => questionHandler.getAllQuestions(req, res, db));
router.post('/api/v1/questions/remove/:question_id', (req, res) => questionHandler.removeQuestion(req, res, db));

module.exports = router;