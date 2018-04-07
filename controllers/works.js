const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports.works = function (req, res) {
    const sendObj = {
      title: 'Мои работы'
    };

    res.render('pages/works', Object.assign({}, sendObj));
}