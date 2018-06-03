const express = require('express');

module.exports = (db) => {
    const router = express.Router();
    router.route('/all')
        .get((req, res, next) => {
            db.User.findAll({
                include: [db.Question]
            }).then((users) => {
                res.render('user-listing', {
                    users
                });
            });
        });
    return router;
};