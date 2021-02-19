const HandledError = require('./handledError');
const errorResponse = require('../responses/error');

const uids = {
    INVALID_PARAMETER: 1,
};

module.exports = class Validation extends HandledError {
    constructor(errors = []) {
        super('The request is not valid');
        this.errors = errors;
    }

    getStatus() {
        return 422;
    }

    getBody() {
        return errorResponse(this.message, "validation_failed", {
            errors: this.errors,
        });
    }
};

module.exports.createError = (
    key,
    source,
    message,
    uid = uids.INVALID_PARAMETER
) => ({
    key,
    source,
    message,
    uid,
});
