let CLASSES_TABLE = "classes";
let CLASS_MEMBERS_TABLE = "class_members";
let GROUPS_TABLE = "groups";
let GROUP_MEMBERS_TABLE = "group_members";


/**
 * Allow a professor to create a class
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
                        max_members: max_members, created_at: created_at,
                        current_members: 0
                    }
                ).returning('*')
                    .then(item => {
                        res.json(item)
                    })
                    .catch(err => {
                        res.status(400).json({dbError: err})
                    })
            } else {
                // If user does exist, do
                // not create new user.
                res.json({dbError: 'Class already Exists'})
            }
        })
        .catch(err => {
            res.status(400).json({dbError: 'Error connecting to the db'})
        });
};


/**
 * Enroll a student in a particular class.
 * @param req
 * @param res
 * @param db
 */
const joinClass = (req, res, db) => {
    const {professor_id, class_name, user_id} = req.body;

    //First check to see if class exists
    db.from(CLASSES_TABLE).select('*').where({professor_id: professor_id, class_name: class_name})
        .then((rows) => {
            if (rows.length > 0) {
                // If class does exist.
                let classCode = rows[0].class_code;
                var current_member = rows[0].current_members;
                db(CLASS_MEMBERS_TABLE).insert({class_code: classCode, member_id: user_id})
                    .returning('*')
                    .then((classMembersItem) => {
                        current_member += 1;
                        db(CLASSES_TABLE).update({current_members: current_member}).where({
                            professor_id: professor_id,
                            class_name: class_name
                        })
                            .returning('*')
                            .then(classTableItem => {
                                res.json({
                                    success: "Success", class_details: {
                                        class_code: classTableItem[0].class_code,
                                        class_name: classTableItem[0].class_name,
                                        professor_id: classTableItem[0].professor_id,
                                        current_members: classTableItem[0].current_members,
                                        max_members: classTableItem[0].max_members,
                                    }
                                })
                            })
                            .catch(err => res.status(400).json({dbError: 'Error updating the class table'}))
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({dbError: 'Error inserting the member in the class'})
                    })
            } else {
                // If class does exist, do not create new user.
                res.json({dbError: 'Class does not already exists'})
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
            res.status(400).json({dbError: err.toString()})
        });
};

/**
 * Get all of the classes that a professor has set up.
 * @param req
 * @param res
 * @param db
 */
const getProfessorsClasses = (req, res, db) => {
    const {professor_id} = req.params;

    //First check to see if user already exists
    db.from(CLASSES_TABLE).select('*').where({professor_id: professor_id})
        .then((rows) => {
            if (rows.length > 0) {
                res.json(rows)
            } else {
                res.json([])
            }
        })
        .catch(err => {
            res.status(400).json({dbError: err.toString()})
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
                console.log('There is no class that exists with class code: ');
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
 * Creates random groups of students for a class.
 * @param req
 * @param res
 * @param db
 */
const createGroups = (req, res, db) => {
    const {class_code} = req.params;
    const {class_name, project_name} = req.body;
    var groupings = {};

    // Get all of the students in the class.
    db.from(CLASS_MEMBERS_TABLE).select('*').where({class_code: class_code})
        .then((students) => {
            if (students.length === 0) {
                // If there are no students return an error.
                console.log("There are no students in a class with this class_code");
                res.json({dbSelectionError: 'There are no students in a class with this class_code: ' + class_code})
            } else {
                // Once you have the students, do some operation on them to create the groupings.
                groupings = generateGroups(students, 3);

                var group_number = 1;
                for (var group_id in groupings) {
                    let current_group_code = 0;
                    // check if the property/key is defined in the object itself, not in parent
                    if (groupings.hasOwnProperty(group_id)) {

                        // Add the student to groups and group_members tables.
                        let created_at = new Date();
                        let group_name = project_name + ": " + group_number;
                        db(GROUPS_TABLE).insert({
                            class_code: class_code, group_name: group_name, class_name: class_name,
                            project_name: project_name, created_at: created_at
                        })
                            .returning('*')
                            .then((item) => {
                                let group = groupings[group_id];
                                for (var group_member in group) {
                                    db(GROUP_MEMBERS_TABLE)
                                        .insert({
                                            group_code: item[0]['group_code'],
                                            class_code: class_code,
                                            member_id: group[group_member]
                                        })
                                        .returning('*')
                                        .then(item => {
                                            // Do nothing for now
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(400).json({dbError: err});
                                            return;
                                        });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json({dbError: err});
                                return;
                            });
                    }
                    // Increment the group number by 1.
                    group_number += 1;
                }
                // Return the groups back the user.
                res.json({groups: groupings});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({dbError: 'db error'})
        });
};

/**
 * Get all of the groups for a particular class
 * @param req
 * @param res
 * @param db
 */
const getAllClassesGroups = (req, res, db) => {
    const {class_code} = req.params;
    //First check to see if class already exists
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
    const {class_code, user_id} = req.params;

    // This selection should return the row that corresponds to a student in a particular group in a particular class
    db.from(GROUP_MEMBERS_TABLE).select('*').where({member_id: user_id, class_code: class_code})
        .then((group) => {
            if (group.length === 0) {
                // The user is not in any groups.
                res.json([])
            } else {
                // The group that is returned will have a group code. This group code can be used to get the other
                // other students belonging to that group.

                db.from(GROUP_MEMBERS_TABLE).select('*').where({group_code: group[0].group_code})
                    .then((groups) => {
                        if (groups.length === 0) {
                            // There are no users in this group.
                            res.json({dbError: 'There are no users in this group'})
                        } else {
                            // The group that is returned will have a group code. This group code can be used to get the other
                            // other students belonging to that group.
                            res.json(groups)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({dbError: 'db error'});
                        return;
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({dbError: 'db error'})
        });

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


const deleteClassMembers = (req, res, db) => {
    // delete a class based on class code
    const {class_code, member_id} = req.body;

    db.from(CLASS_MEMBERS_TABLE).where({class_code: class_code, member_id: member_id}).del()
        .then((rows) => {
            res.json({success: "classes deleted: " + rows})
        })
        .catch(err => res.json({dbError: err}))
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
    var counter = 1;
    for (var student in students) {
        if (counter == per_group) {
            group += 1;
        }
        if (group in groups) {
            groups[group].push(students[student].member_id);
        } else {
            groups[group] = [students[student].member_id];
        }
        counter += 1;
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
    getProfessorsClasses,
    getStudentsClassGroup,
    deleteClass,
    deleteClassMembers
}
