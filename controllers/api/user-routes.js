const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// post request is used to create a new user in the db
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});