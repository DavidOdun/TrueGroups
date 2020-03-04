let CLASSES_TABLE = "classes";
let CLASS_MEMBERS_TABLE = "class_members";
let GROUPS_TABLE = "groups";
let GROUP_MEMBERS_TABLE = "group_members";

const createClass = (req, res, db) => {
    const { professor_id, class_name, max_members } = req.body;
    //First check to see if user already exists
    db.from(CLASSES_TABLE).select('*').where('email', '=', email)
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

const joinClass = (req, res, db) => {
    const { professor_id, class_name, user_id } = req.body;

    //First check to see if user already exists
    db.from(CLASSES_TABLE).select('*').where({professor_id: professor_id, class_name:  class_name})
        .then((rows) => {
            if (rows.length > 0) {
                // If class does exist.
                let class_id = rows[0]['class_id'];
                db(CLASS_MEMBERS_TABLE).insert({ "class_id": class_id, "member_id": user_id })
                    .returning('*')
                    .then(item => {
                        res.json(item)
                    })
                    .catch(err => res.status(400).json({dbError: 'Error inserting the user in the class'}))
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'Class does not Exists'})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: 'Error finding with connecting to the db'})});

};

const getUserEnrolledClasses = (req, res, db) => {
    const { user_id } = req.body;

    //First check to see if user already exists
    db.from(CLASS_MEMBERS_TABLE).select('*').where({member_id: user_id})
        .then((rows) => {
            if (rows.length > 0) {
                var classes = [];
                for (let row in rows) {
                    classes.push(row['class_id']);
                }
                res.json(classes)
            } else {
                res.json({error: "The user is not enrolled in any classes"})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: 'Error connecting to the db'})});
};

const getClassDetails = (req, res, db) => {

};

const createGroups = (req, res, db) => {

};

const getAllClassesGroups = (req, res, db) => {

};

const getStudentsClassGroup = (req, res, db) => {

};

const deleteClass = (req, res, db) => {

};
// Fake Writing

module.exports = {
    createClass,
    joinClass,
    getUserEnrolledClasses,
    getClassDetails,
    createGroups,
    getAllClassesGroups,
    getStudentsClassGroup,
    deleteClass
}