let passwordHash = require('password-hash');
let USERS_TABLE = 'users';
let SURVEYS_TABLE = 'users';
const createUser = (req, res, db) => {
    const { title, first_name, last_name, preferred_first_name, user_name, email, raw_password, user_type, institution } = req.body;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('email').where('email', '=', email)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does not exist, create new user.
                let password = passwordHash.generate(raw_password);
                const added = new Date();
                db(TABLE).insert({ title, first_name, last_name, preferred_first_name, user_name,
                    email, password, user_type, institution, added})
                    .returning('*')
                    .then(item => {
                        res.json(item)
                    })
                    .catch(err => res.status(400).json({dbError: 'db error'}))
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'User already Exists'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

const authenticateUser = (req, res, db) => {
    const { email, password} = req.body;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('email').where('email', '=', email)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with email: ' + email})
            } else {
                let hashedPassword = passwordHash.generate(password);
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

const getUserInformation = (req, res, db) => {
    const {email} = req.body;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('email').where('email', '=', email)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with email: ' + email})
            } else {
                for (let row in rows) {
                    if (row['email'] === email) {
                        res.json(row);
                        break;
                    }
                }
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

const updateBasicUserInfo = (req, res, db) => {
    const {email} = req.body;

    for (let key in req.body) {
        if (key !== 'email') {
            db.from(USERS_TABLE).update(req[key]).where('email', '=', email)
                .then(u => res.status(!!u?200:404).json({success:!!u}))
                .catch(e => res.status(500).json(e));
        }
    }
};

// Update the student response to the survey question. If there is no response,
// one will be persisted.
const updateSurveyUserInfo = (req, res, db) => {
    const {question_id, response} = req.body;
    db.from(USERS_TABLE).select('email').where('email', '=', email)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with email: ' + email})
            } else {
                let row = rows[0];
                if (row['email'] === email) {
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
    getUserInformation,
    updateBasicUserInfo,
    updateSurveyUserInfo
};