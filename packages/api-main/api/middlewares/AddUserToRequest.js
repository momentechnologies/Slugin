const passport = require('passport');

module.exports = (req, res, next) =>
    passport.authenticate(
        'jwt',
        { session: false },
        (err, user, info, status) => {
            if (err) {
                return next(err);
            }

            req.user = user ? user : null;

            next();
        }
    )(req, res, next);
