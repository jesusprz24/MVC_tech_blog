const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

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

// 
router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            {
                model: Comment
            }
        ]
    }).then((post) => {
        if (!post) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }
        post = post.get({ plain: true });
        res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    });
});

router.get('/dashboard', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User
            }
        ]
    }).then((posts) => {
        posts = posts.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    });
});

// get request for comment, retrieves post with its specified id
router.get('/comment/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            {
                model: Comment,
                include: [
                    {
                        model: User
                    }
                ]

            }
        ]
    // if no post is found the status will render an error with this message
    }).then((post) => {
        if (!post) {
            res.status(404).json({ message: 'There is no post found with this id' });
            return;
        }
        post = post.get({ plain: true });
        res.render('comment', { post, loggedIn: req.session.loggedIn });
    });
});

// get request finds a comment with a specified id for edit-comment
router.get('/edit-comment/:id', withAuth, (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
        ]
    }).then((comment) => {
        if (!comment) {
            res.status(404).json({ message: 'There is no comment found with this id' });
            return;
        }
        comment = comment.get({ plain: true });
        res.render('edit-comment', { comment, loggedIn: req.session.loggedIn });
    });
});

// get request logs out the user from the session
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
