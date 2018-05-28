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
    return router;
};