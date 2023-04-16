// require dependencies
const router = require('express').Router();
const { Post, User } = require('../models');
const auth = require('../utils/auth');

// get request uses the code for post and user models for mysql db
router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User
            }
        ],
        where: {
            user_id: req.session.user_id
        }

    }) .then((post) => {
        post = posts.map((post) => post.get({ plain: true }));
        res.render('dashboard', {post});
    });
});

module.exports = router;