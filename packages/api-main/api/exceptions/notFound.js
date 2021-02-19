const HandledError = require('./handledError');
const errorResponse = require('../responses/error');

const uids = {
    NO_ACCESS: 1,
    NOT_LOGGED_IN: 2,
};

module.exports = class NotFound extends HandledError {
    constructor(parameter) {
        super('Something was not found');
        this.parameter = parameter;
    }

    getStatus() {
        return 404;
    }

    getBody() {
        return errorResponse(this.message, "not_found", {
            parameter: this.parameter,
        });
    }
};

module.exports.uids = uids;
