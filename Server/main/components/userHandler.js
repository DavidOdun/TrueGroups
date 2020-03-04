// let passwordHash = require('password-hash');
let USERS_TABLE = 'users';
let SURVEYS_TABLE = 'users';

// Endpoint: /api/v1/users/create
const createUser = (req, res, db) => {
    const { title, first_name, last_name, preferred_first_name, user_name, email, raw_password, user_type, institution } = req.body;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('email').where('email', '=', email)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does not exist, create new user.
                let password = raw_password;
                const added = new Date();
                db(TABLE).insert({ title, first_name, last_name, preferred_first_name, user_name,
                    email, password, user_type, institution, added})
                    .returning('*')
                    .then(item => {
                        res.json(item)
                    })
                    .catch(err => res.status(400).json({dbError: 'Error inserting the user in the db'}))
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'User already Exists'})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: 'Error finding with connecting to the db'})});
};

// Endpoint: /api/v1/users/authenticate
const authenticateUser = (req, res, db) => {
    const { email, password} = req.body;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('email').where('email', '=', email)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with email: ' + email})
            } else {
                let hashedPassword = password;
                let storedHash = rows[0]['password'];
                if (hashedPassword === storedHash) {
                    res.json(rows[0])
                } else {
                    res.json({error: 'Wrong password for user with email: ' + email})
                }
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

// Endpoint: /api/v1/users/get/:user_name
const getUser = (req, res, db) => {
    const {user_name} = req.params;
    console.log("user name: " + user_name);
    //First check to see if user already exists
    db.from(USERS_TABLE).select('user_name').where('user_name', '=', user_name)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with user name: ' + user_name})
            } else {
                for (let row in rows) {
                    if (row['user_name'] === user_name) {
                        res.json(row);
                        break;
                    }
                }
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

// Endpoint: /api/v1/users/update/basic/:user_name
const updateBasicUserInfo = (req, res, db) => {
    const {user_name} = req.params;
    console.log("user name: " + user_name);

    for (let key in req.body) {
        if (key !== 'email') {
            console.log(key + ": " + req.body[key]);
            db.from(USERS_TABLE).update(req[key]).where('user_name', '=', user_name)
                .then(u => res.status(!!u?200:404).json({success:!!u}))
                .catch(e => res.status(500).json(e));
        }
    }
    res.json({success: "yes"})
};


// Update the student response to the survey question. If there is no response,
// one will be persisted.
// Endpoint: /api/v1/users/update/survey/:user_name
const updateSurveyUserInfo = (req, res, db) => {
    const {user_name} = req.params;
    console.log("user name: " + user_name);

    const {question_id, response} = req.body;

    db.from(USERS_TABLE).select('user_name').where('user_name', '=', user_name)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with email: ' + email})
            } else {
                let row = rows[0];
                if (row['user_name'] === user_name) {
                    let id = row['id'];
                    db(SURVEYS_TABLE).insert({id, question_id, response})
                        .returning('*')
                        .then(item => {
                            res.json('success');
                        })
                        .catch(err => res.status(400).json({dbError: 'db error'}))
                }
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

// Fake Writing

module.exports = {
    createUser,
    authenticateUser,
    getUser,
    updateBasicUserInfo,
    updateSurveyUserInfo
};