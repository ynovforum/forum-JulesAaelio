const moment = require('moment');
module.exports = (app) => {
    app.use((req,res,next) => {
        if(req.user) {
            res.locals.user = req.user;
        }
        res.locals.moment = moment;
        next();
    });

    app.get('/',(req,res) => {
        res.render('base');
    });
};

