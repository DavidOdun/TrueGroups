const md5 = require("md5");

let USERS_TABLE = 'users';
let SURVEYS_TABLE = 'student_responses';

// Endpoint: /api/v1/users/create
const createUser = (req, res, db) => {
    const {first_name, last_name, preferred_first_name, user_name, email, password, user_type, institution} = req.body;
//First check to see if user already exists
    db.from(USERS_TABLE).select('*').where({email: email})
        .then((rows) => {
            if (rows.length === 0) {
                db.from(USERS_TABLE).select('*').where({user_name: user_name})
                    .then((rows) => {
                        if (rows.length === 0) {
                            // If user does not exist, create new user.
                            let passwordHash = md5(password);
                            const created_at = new Date();
                            db(USERS_TABLE).insert({
                                first_name, last_name, preferred_first_name: preferred_first_name, user_name,
                                email, password: passwordHash, user_type, institution, created_at
                            })
                                .returning('*')
                                .then(item => {
                                    res.json(item)
                                })
                                .catch(err => res.status(400).json({dbError: err}))
                        } else {
                            res.json({dbError: 'User name already taken'})
                        }
                    })
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'Email is already taken'})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: err})
        });
};

// Endpoint: /api/v1/users/authenticate
const authenticateUser = (req, res, db) => {
    const {email, password} = req.body;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('*').where({email: email})
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with email: ' + email})
            } else {
                let hashedPassword = md5(password);
                let storedHash = rows[0].password;
                if (hashedPassword === storedHash) {
                    res.json(rows[0])
                } else {

                    res.json({error: 'Wrong password for user with email: ' + email})
                }
            }
        })
        .catch(err => {
            res.status(400).json({dbError: err});
        });
};

// Endpoint: /api/v1/users/get/:user_name
const getUser = (req, res, db) => {
    const {user_name} = req.params;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('*').where({user_name: user_name})
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no used that exists with user name: ' + user_name})
            } else {
                res.json(rows[0])
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

// Endpoint: /api/v1/users/update/basic/:user_name
const updateBasicUserInfo = (req, res, db) => {
    const {user_name} = req.params;

    for (let key in req.body) {
        if (key !== 'email') {
            switch (key) {
                case 'first_name':
                    db.from(USERS_TABLE).update({first_name: req.body[key]}).where({user_name: user_name})
                        .then((u) => {
                            db.from(USERS_TABLE).select('*').where({user_name: user_name})
                                .then((rows) => {
                                    res.json(rows[0]);
                                })
                        })
                        .catch((e) => {
                            res.status(500).json(e)
                        });
                    break;
                case 'last_name':
                    db.from(USERS_TABLE).update({last_name: req.body[key]}).where({user_name: user_name})
                        .then((u) => {
                            db.from(USERS_TABLE).select('*').where({user_name: user_name})
                                .then((rows) => {
                                    res.json(rows[0]);
                                })
                        })
                        .catch((e) => {
                            res.status(500).json(e)
                        });
                    break;
                case 'preferred_first_name':
                    db.from(USERS_TABLE).update({preferred_first_name: req.body[key]}).where({user_name: user_name})
                        .then((u) => {
                            db.from(USERS_TABLE).select('*').where({user_name: user_name})
                                .then((rows) => {
                                    res.json(rows[0]);
                                })
                        })
                        .catch((e) => {
                            res.status(500).json(e)
                        });
                    break;
                case 'institution':
                    db.from(USERS_TABLE).update({institution: req.body[key]}).where({user_name: user_name})
                        .then((u) => {
                            db.from(USERS_TABLE).select('*').where({user_name: user_name})
                                .then((rows) => {
                                    res.json(rows[0]);
                                })
                        })
                        .catch((e) => {
                            res.status(500).json(e)
                        });
                    break;
                case 'password':
                    db.from(USERS_TABLE).update({password: md5(req.body[key])}).where({user_name: user_name})
                        .then((u) => {
                            db.from(USERS_TABLE).select('*').where({user_name: user_name})
                                .then((rows) => {
                                    res.json(rows[0]);
                                })
                        })
                        .catch((e) => {
                            res.status(500).json(e)
                        });
                    break;

            }
        }
    }
};


// Update the student response to the survey question. If there is no response,
// one will be persisted.
// Endpoint: /api/v1/users/update/survey/:user_name
const updateSurveyUserInfo = (req, res, db) => {
    const {user_name} = req.params;
    db.from(USERS_TABLE).select('*').where({user_name: user_name})
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no user that exists with user_name: ' + user_name})
            } else {
                var count = 0;
                let id = rows[0]['id'];
                for (let question_id in req.body) {
                    db.from(SURVEYS_TABLE).update({response: req.body[question_id]}).where({id: id, question_id: question_id})
                        .then((u) => {
                            db.from(USERS_TABLE).select('*').where({user_name: user_name})
                                .then((rows) => {
                                    count += 1;
                                })
                        })
                        .catch((e) => {

                        });
                }
                res.json("Success: " + count + " Rows Updated");
            }
        });
};

// Update the student response to the survey question. If there is no response,
// one will be persisted.
// Endpoint: /api/v1/users/update/survey/:user_name
const deleteUser = (req, res, db) => {
    const {user_name} = req.params;
    //First check to see if user already exists
    db.from(USERS_TABLE).select('*').where({user_name: user_name})
        .then((rows) => {
            if (rows.length !== 0) {
                db.from(USERS_TABLE).where({user_name: user_name}).del()
                    .then((rows) => {
                        res.json({success: "users deleted: " + rows})
                    })
                    .catch(err => res.json({dbError: err}))

            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'User does not exist'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error: ' + err}));
};


module.exports = {
    createUser,
    authenticateUser,
    getUser,
    updateBasicUserInfo,
    updateSurveyUserInfo,
    deleteUser
};