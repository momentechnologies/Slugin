const UnauthorizedException = require('../../exceptions/unauthorized');

const methods = {
    organizationId: require('./organization'),
    threadId: require('./thread'),
};

const authorize = async (key, value, user) => {
    if (!methods[key]) {
        throw new Error(`Authorization method ${key} was not found`);
    }

    return methods[key](user, value);
};

module.exports = (optionsFnc = () => ({})) => next => async (
    root,
    args,
    context,
    info
) => {
    if (!context.user) {
        throw new UnauthorizedException(
            'Not authorized',
            UnauthorizedException.uids.NOT_LOGGED_IN
        );
    }

    const options = optionsFnc(root, args);

    await Promise.all(
        Object.keys(options).map(key =>
            authorize(key, options[key], context.user)
        )
    );

    return next(root, args, context, info);
};
