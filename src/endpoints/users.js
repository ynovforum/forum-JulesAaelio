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

    router.post('/:id/promote', (req, res, next) => {
        if (req.params.id !== req.user.id) {
            db.User.findById(req.params.id)
                .then(user => {
                    if (user) {
                        user.role = 'ADMIN';
                        user.save().then(user => {
                            res.send(user);
                        });
                    } else {
                        next()
                    }
                })
        }
    });

    router.post('/:id/demote', (req, res, next) => {
        if (req.params.id !== req.user.id) {
            db.User.findById(req.params.id)
                .then(user => {
                    if (user) {
                        user.role = 'USER';
                        user.save().then(user => {
                            res.send(user);
                        });
                    } else {
                        next()
                    }
                })
        }
    });

    return router;
};