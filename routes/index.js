const express = require('express');
const router = express.Router();

const ctrlBlog = require('../controllers/blog');
const ctrlIndex = require('../controllers/index');
const ctrlAbout = require('../controllers/about');
const ctrlWorks = require('../controllers/works');
const ctrlAdmin = require('../controllers/admin');

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
};

router.get('/blog', ctrlBlog.blog);
router.get('/', ctrlIndex.index);
router.get('/index', ctrlIndex.index);
router.post('/', ctrlIndex.auth);
router.post('/index', ctrlIndex.auth);
router.get('/about', ctrlAbout.about);
router.get('/works', ctrlWorks.works);
router.get('/admin', ctrlAdmin.admin);

module.exports = router;