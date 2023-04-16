// require the routes and express
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// post request uses express router to create a new post while the withAuth checks to see if the user is logged in before it can be
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});