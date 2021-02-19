const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

module.exports = {
    encrypt: (payload, expireHours = 72) =>
        jwt.sign(
            {
                payload,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * expireHours,
            },
            config.secret
        ),
    decrypt: token => jwt.decode(token, config.secret).payload,
};
