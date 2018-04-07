const mongoose = require('mongoose');
const passport = require('passport');

module.exports.auth = function (req, res, next) {
  passport.authenticate('loginUsers', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/index');
      console.log("works!");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
}

module.exports.index = function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect('/admin');
    }
    const sendObj = {
      title: 'Добро пожаловать'
    };
    res.render('pages/index', Object.assign({}, sendObj));
}