module.exports.about = function (req, res) {
    const sendObj = {
      title: 'Обо мне'
    };

    const skills = [
        {
            title: 'Frontend',
            techs: ['HTML5', 'CSS3', 'JavaScript']
        }, 
        {
            title: 'Backend',
            techs: ['Node.js', 'Mongo.db', 'PHP', 'MySQL']
        }, 
        {
            title: 'Workflow',
            techs: ['Git', 'Gulp', 'Webpack']
        }
    ];
    res.render('pages/about', Object.assign({}, sendObj, {skills}));
}