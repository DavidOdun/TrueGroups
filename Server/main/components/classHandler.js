let CLASSES_TABLE = "classes";
let CLASS_MEMBERS_TABLE = "class_members";
let GROUPS_TABLE = "groups";
let GROUP_MEMBERS_TABLE = "group_members";


/**
 *
 * @param req
 * @param res
 * @param db
 */
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
                    .catch(err => res.status(400).json({dbError: err}))
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'Class already Exists'})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: 'Error connecting to the db'})
        });
};


/**
 *
 * @param req
 * @param res
 * @param db
 */
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
                        db(CLASSES_TABLE).update({current_members: current_member}).where({
                            professor_id: professor_id,
                            class_name: class_name
                        })
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


/**
 * Get all of the classes that a student is currently enrolled in.
 * @param req
 * @param res
 * @param db
 */
const getUserEnrolledClasses = (req, res, db) => {
    const {user_id} = req.params;

    //First check to see if user already exists
    db.from(CLASS_MEMBERS_TABLE).select('*').where({member_id: user_id})
        .then((rows) => {
            if (rows.length > 0) {
                res.json(rows)
            } else {
                res.json({error: "The user is not enrolled in any classes"})
            }
        })
        .catch(err => {
            console.log("err:" + user_id);
            res.status(400).json({dbError: err})
        });
};

/**
 * Get all details related to a class.
 * @param req
 * @param res
 * @param db
 */
const getClassDetails = (req, res, db) => {
    const {class_code} = req.params;
    //First check to see if user already exists
    db.from(CLASSES_TABLE).select('*').where({class_code: class_code})
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no class that exists with class code: ' + class_code})
            } else {
                res.json(rows)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({dbError: err})
        });

};

/**
 * Creates random groups for a class.
 * @param req
 * @param res
 * @param db
 */
const createGroups = (req, res, db) => {
    const {class_code} = req.body;

    db.from(CLASS_MEMBERS_TABLE).select('*').where({class_code: class_code})
        .then((students) => {
            if (students.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There are no students in a class with this class_code: ' + class_code})
            } else {
                // Once you have the students, do some operation on them to create the groupings.
                let groupings = generateGroups(students);
                for (var group_id in groupings) {
                    // check if the property/key is defined in the object itself, not in parent
                    if (groupings.hasOwnProperty(group_id)) {
                        let group = groupings[group_id];
                        //TODO(ecunnin2):
                        // Add the student to group_members and groups tables.
                        // Return the data to the client.
                    }
                }
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

/**
 * Get all of the groups for a particular class
 * @param req
 * @param res
 * @param db
 */
const getAllClassesGroups = (req, res, db) => {
    const {class_code} = req.body;
    //First check to see if class already exists
    //TODO(allen): We need the database to have class_codes in the groups table.
    db.from(GROUPS_TABLE).select('*').where({class_code: class_code})
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There are no groups with this class_code: ' + class_code})
            } else {
                res.json(rows)
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

/**
 * Get the group that a student is currently in for a particular class.
 * @param req
 * @param res
 * @param db
 */
const getStudentsClassGroup = (req, res, db) => {
    const {class_code, user_id} = req.body;

    // First get all of the groups that a student is currently enrolled in
    db.from(GROUP_MEMBERS_TABLE).select('*').where({member_id: user_id})
        .then((groups) => {
            if (groups.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'The user is not in any groups'})
            } else {
                //TODO (allen): I think the database does not support this call.
                // I'm not sure how to associate the groups table with the classes table.
                res.json(groups[0])
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));

};

/**
 * Deletes a class that is stored in the
 * @param req The request parameter can either take in a class_code
 * or class_name and professor_id in the body
 * @param res
 * @param db
 */
const deleteClass = (req, res, db) => {
    // delete a class based on class code
    const {class_code, class_name, professor_id} = req.body;

    if (class_code !== undefined) {
        db.from(CLASSES_TABLE).where({class_code: class_code}).del()
            .then((rows) => {
                res.json({success: "classes deleted: " + rows})
            })
            .catch(err => res.json({dbError: err}))
    } else if (class_name !== undefined && professor_id !== undefined) {
        db.from(CLASSES_TABLE).where({class_name: class_name, professor_id: professor_id}).del()
            .then((rows) => {
                res.json({success: "classes deleted: " + rows})
            })
            .catch(err => res.json({dbError: err}))
    } else {
        res.json({error: "Need to provide either a class_code, or a class_name and professor_id."})
    }
};


function generateGroups(students, per_group) {
    var currentIndex = students.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = students[currentIndex];
        students[currentIndex] = students[randomIndex];
        students[randomIndex] = temporaryValue;
    }

    var groups = {};

    var group = 1;
    for (var student in students) {
        if (group % per_group === 0) {
            group += 1;
        }
        if (group in groups) {
            groups[group].push(student.member_id);
        } else {
            groups[group] = [student.member_id];
        }
    }


    return groups;
}


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
