module.exports  = (app,auth, passport, db) => {
    app.get('/login',(req,res) =>{
        res.render('login',{
            redirectTo : req.query.redirectTo
        });
    });

    app.post('/login',(req,res,next) => {
            passport.authenticate('local', {
                successRedirect: req.query.redirectTo !== 'undefined' ? req.query.redirectTo : '/',
                failureRedirect: '/login',
            })(req, res,next);
        }
    );
    app.get('/register',(req,res) => {
        res.render('signup',{
            redirectTo : req.query.redirectTo
        });
    });
    app.post('/register',auth.register(db.User));

    app.get('/logout',(req,res) => {
        req.logout();
        res.redirect('/');
    });

    return app;

};