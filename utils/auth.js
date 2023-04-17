// middleware that checks if the user is logged in
// function withAuth used in other files
const withAuth = (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;