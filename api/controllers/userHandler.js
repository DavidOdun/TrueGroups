const createUser = (req, res, db) => {
    let TABLE = '';
    const { first, last, email, phone, location, hobby } = req.body;
    //First check to see if user already exists
    db.from(TABLE).select('email').where('email', '=', email)
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'User already Exists'})
            } else {
                // If user does not exist, create new user.
                const added = new Date();
                db(TABLE).insert({first, last, email, phone, location, hobby, added})
                    .returning('*')
                    .then(item => {
                        res.json(item)
                    })
                    .catch(err => res.status(400).json({dbError: 'db error'}))
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

const authenticateUser = (req, res, db) => {

};

const getUserInformation = (req, res, db) => {

};

const updateBasicUserInfo = (req, res, db) => {

};

const updateSurveyUserInfo = (req, res, db) => {

};

// Fake Writing

module.exports = {
    createUser,
    authenticateUser,
    getUserInformation,
    updateBasicUserInfo,
    updateSurveyUserInfo
};