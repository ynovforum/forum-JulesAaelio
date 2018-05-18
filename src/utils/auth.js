const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function init(User) {
    passport.use(new LocalStrategy((email, password, done) => {
        console.log('[AUTH]',email,password);
        User
            .findOne({
                where : { email }
            }).then(function (user) {
                if(user) {
                    bcrypt.compare(password,user.password).then(r=> {
                        if(r) {
                            return done(null, user)
                        }else {
                            return done(null, false, {
                                message: 'Invalid credentials'
                            });
                        }
                    });
                }else {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
        })
        // If an error occured, report it
            .catch(done);
    }));

    // Save the user's email address in the cookie
    passport.serializeUser((user, cookieBuilder) => {
        cookieBuilder(null, user.email);
    });

    passport.deserializeUser((email, cb) => {
        console.log("AUTH ATTEMPT",email);
        // Fetch the user record corresponding to the provided email address
        User.findOne({
            where : { email }
        }).then(r => {
            if(r) return cb(null, r);
            else return cb(new Error("No user corresponding to the cookie's email address"));
        });
    });

    return passport;
}

function registerCallback(User) {
    return (req, res) => {
        if (req.body && req.body.firstname && req.body.lastname && req.body.password && req.body.email) {
            User.findOne({
                where: {
                    email: req.body.email,
                }
            }).then((r) => {
                if (r) {
                    res.render('login', {
                        errors: {
                            signup: [
                                "Cette addresse est déjà utilisée."
                            ]
                        }
                    })
                } else {
                    bcrypt.hash(req.body.password,10).then((password => {
                        User.create({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: password,
                            email: req.body.email,
                        }).then((r) => {
                            console.log('[AUTH]User created');
                            req.login(r, (r) => {
                                res.redirect('/');
                            });

                        }).catch(e => {
                            console.error(e);
                        })
                    }))
                }
            })
        }
    }
}

module.exports.passport = init;
module.exports.register = registerCallback;


