const HandledError = require('../exceptions/handledError');

module.exports = (err, req, res, next) => {
    let body = {
        success: false,
        message: 'Server error',
        extra: err,
    };
    let status = 500;

    if (err instanceof HandledError) {
        status = err.getStatus();
        body = err.getBody();
    } else if (err.handledError) {
        status = err.statusCode;
        body = err.getBody();
    }

    console.error(err.stack);
    body.trace = err.stack;

    res.status(status).json(body);
};
