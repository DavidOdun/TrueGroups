const express = require('express')

// use process.env variables to keept private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // Creates Headers that protect from attacks (Security)
const bodyParser = require('body-parser') // turns responses into usable format
const cors = require('cors') // allows/disallows cross-sit communication
const morgan = require('morgan')

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

// Controllers - The db queries
const main = require('./controllers/main');
const userHandler = require('./controllers/userHandler');
const classHandler = require('./controllers/classHandler');

// App
const app = express();

// App Middleware
const whitelist = ['http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback){
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined'))

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

// API Endpoints
// User Related
app.put('/api/v1/users/create', (req, res) => userHandler.createUser(req, res, db));
app.post('/api/v1/users/authenticate', (req, res) => userHandler.authenticateUser(req, res, db));
app.post('/api/v1/users/:userId/basic', (req, res) => userHandler.updateBasicUserInfo(req, res, db));
app.post('/api/v1/users/:userId/survey', (req, res) => userHandler.updateSurveyUserInfo(req, res, db));
app.get('/api/v1/users/:userId', (req, res) => userHandler.getUserInformation(req, res, db));

// Class and Group Related
app.put('/api/v1/classes/create', (req, res) => classHandler.createClass(req, res, db));
app.post('/api/v1/classes/join', (req, res) => classHandler.joinClass(req, res, db));
app.get('/api/v1/classes/enrolled/:userId', (req, res) => classHandler.getUserEnrolledClasses(req, res, db));
app.get('/api/v1/classes/details/:classId/', (req, res) => classHandler.getClassDetails(req, res, db));
app.get('/api/v1/classes/makeGroup/:classId', (req, res) => classHandler.createGroups(req, res, db));
app.get('/api/v1/classes/allGroups/:classId', (req, res) => classHandler.getAllClassGroups(req, res, db));
app.get('/api/v1/classes/students/:classId/:studentId', (req, res) => classHandler.getStudentsClassGroup(req, res, db));
app.post('/api/v1/classes/delete', (req, res) => classHandler.deleteClass(req, res, db));

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
})