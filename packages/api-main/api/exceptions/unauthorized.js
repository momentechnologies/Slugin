const HandledError = require('./handledError');
const errorResponse = require('../responses/error');

const uids = {
    NO_ACCESS: 1,
    NOT_LOGGED_IN: 2,
};

module.exports = class Unauthorized extends HandledError {
    constructor(message, uid = uids.NO_ACCESS) {
        super(message);
        this.uid = uid;
    }

    getStatus() {
        return 401;
    }

    getBody() {
        return errorResponse(
            'You are not authorized to access this data',
            'unauthorized',
            {
                message: this.message,
                uid: this.uid,
            }
        );
    }
};

module.exports.uids = uids;
