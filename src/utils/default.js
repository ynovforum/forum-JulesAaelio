const moment = require('moment');
module.exports = (app) => {
    app.use((req,res,next) => {
        if(req.user) {
            res.locals.user = req.user;
        }
        res.locals.moment = moment;
        res.locals.url  = req.originalUrl;
        next();
    });

    app.get('/',(req,res) => {
        res.render('base');
    });
};

