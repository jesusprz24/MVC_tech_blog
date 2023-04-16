const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const auth = require('../utils/auth');

// get request for root path, retrieves posts from db
router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User
            }
        ]
    }).then((posts) => {
        console.log(posts);
        posts = posts.map((posts) => posts.get({ plain: true }));
        res.render('home', { posts, loggedIn: req.ression.loggedIn });
    });
});

// get request for login, if login goes through loggedIn is checked and will take user to root path
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// get request for signup path of server, if already logged in the code takes user to root path, if not renders sign up form
router.get('signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});
