const passport = require('passport');
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const validator = require('validator');
const UserRepository = require('./repositories/user');
const jwtConfig = require('./config/jwt');
const JWTStrategy = passportJWT.Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function(email, password, cb) {
            return UserRepository.getByEmail(validator.normalizeEmail(email))
                .then(user => {
                    if (!user || !bcrypt.compareSync(password, user.password)) {
                        return cb(null, false, {
                            message: 'Incorrect email or password.',
                        });
                    }

                    delete user.password;

                    return cb(null, user, {
                        message: 'Logged In Successfully',
                    });
                })
                .catch(err => {
                    return cb(err);
                });
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: req => {
                if (!req) {
                    return null;
                }

                if (req.cookies && req.cookies.jwt) {
                    return req.cookies.jwt;
                }

                if (req && req.headers && req.headers['x-token']) {
                    return req.headers['x-token'];
                }

                return null;
            },
            secretOrKey: jwtConfig.secret,
        },
        function(jwtPayload, cb) {
            return cb(null, jwtPayload.payload.user);
        }
    )
);
