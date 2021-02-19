const HandledError = require('./handledError');
const errorResponse = require('../responses/error');

module.exports = class Generic extends HandledError {
    constructor(message, key, error = {}) {
        super(message);
        this.key = key;
        this.error = error;
    }

    getStatus() {
        return 400;
    }

    getBody() {
        return errorResponse(this.message, this.key, this.error);
    }
};
