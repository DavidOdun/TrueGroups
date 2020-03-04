let CLASSES_TABLE = "classes";
let CLASS_MEMBERS_TABLE = "class_members";
let GROUPS_TABLE = "groups";
let GROUP_MEMBERS_TABLE = "group_members";

const createClass = (req, res, db) => {
    const {professor_id, class_name, max_members} = req.body;
    //First check to see if user already exists
    db.from(CLASSES_TABLE).select('*').where({professor_id: professor_id, class_name: class_name})
        .then((rows) => {
            if (rows.length === 0) {
                // If class does not exist, create new class.
                let created_at = new Date();
                db(CLASSES_TABLE).insert({
                    professor_id: professor_id, class_name: class_name,
                    max_members: max_members, created_at: created_at
                })
                    .returning('*')
                    .then(item => {
                        res.json(item)
                    })
                    .catch(err => res.status(400).json({dbError: 'Error inserting the user in the db'}))
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'Class already Exists'})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: 'Error connecting to the db'})
        });
};

const joinClass = (req, res, db) => {
    const {professor_id, class_name, user_id} = req.body;

    //First check to see if user already exists
    db.from(CLASSES_TABLE).select('*').where({professor_id: professor_id, class_name: class_name})
        .then((rows) => {
            if (rows.length > 0) {
                // If class does exist.
                let classCode = rows[0].class_code;
                var current_member = rows[0].current_members;
                db(CLASS_MEMBERS_TABLE).insert({"class_code": classCode, "member_id": user_id})
                    .returning('*')
                    .then(classMembersItem => {
                        current_member += 1;
                        db(CLASSES_TABLE).update({current_members: current_member}).where({professor_id: professor_id, class_name: class_name})
                            .returning('*')
                            .then(classTableItem => {
                                res.json(classMembersItem + classTableItem)
                            })
                            .catch(err => res.status(400).json({dbError: 'Error inserting the user in the class'}))
                    })
                    .catch(err => res.status(400).json({dbError: 'Error inserting the user in the class'}))
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'Class does not Exists'})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: 'Error finding with connecting to the db'})
        });

};

const getUserEnrolledClasses = (req, res, db) => {
    const {user_id} = req.body;

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
            res.status(400).json({dbError: 'Error connecting to the db'})
        });
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