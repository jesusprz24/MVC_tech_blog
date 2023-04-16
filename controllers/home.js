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

