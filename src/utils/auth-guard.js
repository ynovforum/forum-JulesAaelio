module.exports = (req,res,next) => {
    if(req.user) {
        res.locals.user = req.user;
        next();
    }else if (req.originalUrl.match('/login') === null && req.originalUrl.match('/register') === null){
        res.redirect('/login?redirectTo='+req.originalUrl);
    }else {
        next()
    }
};