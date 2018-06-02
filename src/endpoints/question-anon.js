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
    return router;
};