const express = require('express');

module.exports = (db) => {
    const router = express.Router();
    router.route('/')
        .get((req,res,next) => {
            res.render('user');
        });
    return router;
};