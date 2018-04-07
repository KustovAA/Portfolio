module.exports.admin = function (req, res) {
    const sendObj = {
      title: 'Панель администрирования'
    };

    res.render('pages/admin', Object.assign({}, sendObj));
}