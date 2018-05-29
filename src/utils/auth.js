const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function init(User) {
    passport.use(new LocalStrategy((email, password, done) => {
        console.log('[AUTH]', email, password);
        User
            .findOne({
                where: {email}
            }).then(function (user) {
            if (user) {
                bcrypt.compare(password, user.password).then(r => {
                    if (r) {
                        return done(null, user)
                    } else {
                        return done(null, false, {
                            message: 'Invalid credentials'
                        });
                    }
                });
            } else {
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
        console.log("AUTH ATTEMPT", email);
        // Fetch the user record corresponding to the provided email address
        User.findOne({
            where: {email}
        }).then(r => {
            if (r) return cb(null, r);
            else return cb(new Error("No user corresponding to the cookie's email address"));
        });
    });

    return passport;
}

function registerCallback(User) {
    function checkForDuplicate(req) {
        return User.findOne({
            where: {
                email: req.body.email,
            }
        })
    }

    function renderWithErrors(res, errors) {
        res.render('login', {
            errors: {
                signup: errors
            }
        })
    }

    const createUser = (req, res,role) => {
        bcrypt.hash(req.body.password, 10).then((password) => {
            User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: password,
                email: req.body.email,
                bio: req.body.bio,
                role: role,
            }).then((r) => {
                console.log('[AUTH]User created');
                req.login(r, (r) => {
                    res.redirect('/');
                });
            });
        });
    };


    return (req, res) => {
        if (req.body && req.body.firstname && req.body.lastname && req.body.password && req.body.email && req.body.bio) {
            let role = 'USER';
            User.count().then(count => {
                if(count === 0){
                    role = 'ADMIN'
                }
            }).then(() => {
                return checkForDuplicate(req)
            }).then((user) => {
                if(user) {
                    renderWithErrors(res,['Cette email est déjà utilisé']);
                }else {
                    createUser(req,res,role);
                }
            })
        }else {
            renderWithErrors(res,['Veuillez renseigner tout les champs']);
        }
    }
}

module.exports.passport = init;
module.exports.register = registerCallback;


