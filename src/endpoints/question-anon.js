const express = require('express');
const empty_comment = {
    template: true,
    content: '',
    user: {
        firstname: '',
        lastname: '',
    },
    createdAt: new Date()
};
module.exports = (db) => {
    const router = express.Router();
    router.route('/:id')
        .get((req, res, next) => {
            db.Question.findById(
                req.params.id,
                {
                    include: [
                        {
                            model: db.User
                        }, {
                            model: db.Comment,
                            include: [db.User]
                        }
                        ]
                }).then(question => {
                    if (question) {
                        res.render('question', {
                            question,
                            empty_comment
                        });
                    } else {
                        next();
                    }
            });
        });

    router.get('/list',(req,res,next) => {
        let questions_all;
        db.Question.findAll({
            order: [
                ['createdAt','DESC'],
            ],
            where: {
              acceptedAnswerId: {
                  [db.db.Op.ne]: null
              }
            },
            include: [db.User]
        }).then(questions => {
            questions_all = questions;
        }).then(() => {
            return db.Question.findAll({
                order: [
                    ['createdAt','DESC'],
                ],
                where: {
                    acceptedAnswerId: {
                        [db.db.Op.eq]: null
                    }
                },
                include: [db.User]
            })
        }).then(questions => {
           questions_all = questions.concat(questions_all);
           let featured_questions = [];
           if(questions.length >= 2) {
               featured_questions = [
                   questions[0],questions[1]
               ]
           }

           res.render('question-listing',{
               questions: questions_all,
               featured_questions : featured_questions,
           });

        });
    });
    return router;
};