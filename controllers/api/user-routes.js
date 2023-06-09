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

// post request for login, is something wrong triggers it it will error and send the massage of it being wrong
router.post('/login', async (req, res) => {
    try {    
    const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // is user logs in successfully it will succeed and say the message if not triggers error
        req.session.save(() => {
            console.log(userData.id, req.session);
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

// post request for the user to log out of the app
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        console.log(req.session, 'Session has concluded');
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        console.log(req.session, 'Log out unsuccessful')
        res.status(404).end();
    }
});

module.exports = router;