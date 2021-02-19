const passport = require('passport');
const Unauthorized = require('../exceptions/unauthorized');

module.exports = (req, res, next) =>
    passport.authenticate(
        'jwt',
        { session: false },
        (err, user, info, status) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(
                    new Unauthorized(
                        'You are not logged in',
                        Unauthorized.uids.NOT_LOGGED_IN
                    )
                );
            }

            req.user = user;

            next();
        }
    )(req, res, next);
