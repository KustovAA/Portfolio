const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    'loginUsers',
    new LocalStrategy(
        {
            usernameField: 'login',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            User.findOne({ login: username })
                .then(user => {
                    if (!user) {
                        console.log("works!");
                        return done(
                            null,
                            false,
                            req.flash('message', 'В авторизации отказано')
                        );
                    }
                    if (!user.validPassword(password)) {
                        console.log("works!");
                        return done(null, false, req.flash('message', 'В авторизации отказано'));
                    }
                    return done(null, user);
                })
                .catch(err => {
                    done(err);
                });
        }
    )
);