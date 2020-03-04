var express = require('express');
var router = express.Router();
var pool = require('./db');

// Controllers - The db queries
const userHandler = require('./components/userHandler');
const classHandler = require('./components/classHandler');

// Database Connection with localhost
var db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'crud-practice-1'
    }
});

/* 
    API POST ROUTES BELOW
*/
router.get('/hello', function (req, res) {
    res.json('hello world')
})

// API Endpoints
// User Related
router.put('/api/v1/users/create', (req, res) => userHandler.createUser(req, res, db));
router.post('/api/v1/users/authenticate', (req, res) => userHandler.authenticateUser(req, res, db));
router.post('/api/v1/users/:userId/basic', (req, res) => userHandler.updateBasicUserInfo(req, res, db));
router.post('/api/v1/users/:userId/survey', (req, res) => userHandler.updateSurveyUserInfo(req, res, db));
router.get('/api/v1/users/:userId', (req, res) => userHandler.getUserInformation(req, res, db));

// Class and Group Related
router.put('/api/v1/classes/create', (req, res) => classHandler.createClass(req, res, db));
router.post('/api/v1/classes/join', (req, res) => classHandler.joinClass(req, res, db));
router.get('/api/v1/classes/enrolled/:userId', (req, res) => classHandler.getUserEnrolledClasses(req, res, db));
router.get('/api/v1/classes/details/:classId/', (req, res) => classHandler.getClassDetails(req, res, db));
router.get('/api/v1/classes/makeGroup/:classId', (req, res) => classHandler.createGroups(req, res, db));
router.get('/api/v1/classes/allGroups/:classId', (req, res) => classHandler.getAllClassGroups(req, res, db));
router.get('/api/v1/classes/students/:classId/:studentId', (req, res) => classHandler.getStudentsClassGroup(req, res, db));
router.post('/api/v1/classes/delete', (req, res) => classHandler.deleteClass(req, res, db));
module.exports = router