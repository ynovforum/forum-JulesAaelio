const express = require('express');
module.exports = (db) => {
    const router = express.Router();
    router.route('/add')
        .get((req,res) => {
            res.render('add_question');
        }).post((req,res) => {
        
        });
    return router;
};