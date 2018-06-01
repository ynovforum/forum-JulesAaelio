const express = require('express');
module.exports = (db) => {
    const router = express.Router({mergeParams: true});
    router.route('/')
        .post((req, res, next) => {
            console.log(req.params);
            console.log(db.User);
            if (req.body.content) {
                db.Question.findById(req.params.questionId).then((q) => {
                    if (q) {
                        db.Comment.create({
                            content: req.body.content,
                            userId: req.user.id,
                            questionId: q.id
                        }, {
                            include: [db.User]
                        }).then(c => {
                            return c.reload()
                        }).then(c => {
                            res.send(c);
                        })
                    } else {
                        next();
                    }
                })
            }
        });

    router.post('/:commentId/accept', (req, res, next) => {
        db.Comment.find({
            where: {
                questionId: req.params.questionId,
                id: req.params.commentId
            }
        }).then(c => {
            if(c) {
                db.Question.findById(c.questionId).then(q => {
                    q.setAcceptedAnswer(c);
                    q.save();
                })
            }else {
                next();
            }
        });
    });
    return router;
};