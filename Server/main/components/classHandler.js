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

const createGroups = (req, res, db) => {

};

const getAllClassesGroups = (req, res, db) => {
    const {class_code} = req.body;
        //First check to see if user already exists
    db.from(GROUPS_TABLE).select('*')
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
              res.json({dbError: 'There are no groups '})
            } else {
                res.json(rows)
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
};

const getStudentsClassGroup = (req, res, db) => {
    const {class_code} = req.body;
        //First check to see if class already exists
    db.from(CLASSES_TABLE).select('*').where({class_code: class_code, student_id})
        .then((rows) => {
            if (rows.length === 0) {
                // If user does exist, do not create new user.
                res.json({dbError: 'There is no class that exists with class code: ' + class_code})
            } else {
                res.json(rows[0])
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}));
    
};

const deleteClass = (req, res, db) => {
    // delete a class based on class code
    db.run(`DELETE FROM classes WHERE class_code=?`, class_code, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Deleted class: ` + class_code);
    });
};


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
