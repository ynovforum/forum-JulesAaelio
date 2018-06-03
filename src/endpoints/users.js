const express = require('express');

module.exports = (db) => {
    const router = express.Router();
    router.route('/all')
        .get((req,res,next) => {
            res.render('user');
        });
    return router;
};