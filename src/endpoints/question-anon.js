const express = require('express');
module.exports = (db) => {
    const router = express.Router();
    router.route('/:id')
        .get((req, res, next) => {
            db.Question.findById(
                req.params.id,
                {
                    include: [db.User]
                }).then(question => {
                    if (question) {
                        res.render('question', {
                            question
                        });
                    } else {
                        next();
                    }
            });
        });
    return router;
};