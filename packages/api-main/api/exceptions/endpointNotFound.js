const HandledError = require('./handledError');
const errorResponse = require('../responses/error');

const uids = {
    NO_ACCESS: 1,
    NOT_LOGGED_IN: 2,
};

module.exports = class EndpointNotFound extends HandledError {
    constructor(path, method) {
        super('Endpoint was not found');
        this.path = path;
        this.method = method;
    }

    getStatus() {
        return 404;
    }

    getBody() {
        return errorResponse(this.message, "endpoint_not_found", {
            path: this.path,
            method: this.method,
        });
    }
};

module.exports.uids = uids;
