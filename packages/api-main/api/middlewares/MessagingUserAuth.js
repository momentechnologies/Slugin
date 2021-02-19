const UnauthorizedException = require('../exceptions/unauthorized');
const TokenUtils = require('../utils/token');

const decryptMessagingUserToken = async messagingUserToken => {
    try {
        const payload = TokenUtils.decrypt(messagingUserToken);
        return payload.messagingUser;
    } catch (e) {
        return false;
    }
};

module.exports = next => async (root, args, context, info) => {
    let messagingUser = await decryptMessagingUserToken(
        args.messagingUserToken
    );

    if (!messagingUser) {
        throw new UnauthorizedException(
            'Not authorized',
            UnauthorizedException.uids.NOT_LOGGED_IN
        );
    }

    return next(root, { ...args, messagingUser }, context, info);
};
module.exports.decryptMessagingUserToken = decryptMessagingUserToken;
