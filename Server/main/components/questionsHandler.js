let QUESTIONS_TABLE = 'questions';

const addQuestion = (req, res, db) => {
    const { question_string } = req.body;
    db(QUESTIONS_TABLE).insert({ question_string })
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error: ' + err}))
};

const getAllQuestions = (req, res, db) => {
    db.from(QUESTIONS_TABLE).select('*')
        .then((rows) => {
            res.json(rows)
        })
        .catch(err => res.status(400).json({dbError: 'db error: ' + err}));
};

const removeQuestion = (req, res, db) => {
    const { question_id } = req.params;
    //First check to see if user already exists
    db.from(QUESTIONS_TABLE).select('*').where('question_id', '=', question_id)
        .then((rows) => {
            if (rows.length !== 0) {
                db.from(QUESTIONS_TABLE).where('question_id', '=', question_id).del()
            } else {
                // If user does exist, do not create new user.
                res.json({dbError: 'Question does not exist'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error: ' + err}));
};


module.exports = {
    addQuestion,
    getAllQuestions,
    removeQuestion
};