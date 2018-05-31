const express = require('express');
module.exports = (db) => {
    const router = express.Router();
    router.route('/add')
        .get((req,res) => {
            res.render('add_question');
        }).post((req,res) => {
            if(req.body.title && req.body.description) {
                db.Question.create({
                    title: req.body.title,
                    description: req.body.description,
                    userId: req.user.id,
                }).then((r) => {
                    console.log('Question created');
                    res.redirect('/question/'+r.id);
                }).catch((e) => {
                    console.error(e);
                });
            }
        });

    router.put('/:id',(req,res,next) => {
        db.Question.findById(req.params.id).then(question => {
            if(question) {
                if(question.userId === req.user.id) {
                    if(req.body.description && req.body.title) {
                        question.title = req.body.title;
                        question.description = req.body.description;
                        question.save().then(r => {
                            res.send(question);
                        }).catch(e => {
                            next(e)
                        });
                    }
                } else {
                    res.status(401);
                }

            }else {
                next();
            }
        });

    });

    return router;
};