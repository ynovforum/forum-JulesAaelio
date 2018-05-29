module.exports = (app) => {
    app.use((req,res,next) => {
        if(req.user) {
            res.locals.user = req.user;
        }
        next();
    });

    app.get('/',(req,res) => {
        res.render('base');
    });
};

