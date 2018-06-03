module.exports = (req,res,next) => {
    if(req.user && req.user.role === 'ADMIN') {
        next();
    }else {
        res.status(403);
    }
};