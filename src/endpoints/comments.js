const express = require('express');
module.exports = (db) => {
    const router = express.Router({mergeParams: true});
    router.route('/')
        .post((req,res,next) => {
            console.log(req.params);
            if(req.body.content) {
               db.Question.findById(req.params.questionId).then((q) => {
                   if(q) {
                       db.Comment.create({
                           content: req.body.content,
                           userId: req.user.id,
                           questionId: q.id
                       }).then(c => {
                           res.send(c);
                       })
                   }else {
                       next();
                   }
               })
            }
        });
    return router;
};