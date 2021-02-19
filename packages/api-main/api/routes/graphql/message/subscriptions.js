const GraphqlPubSub = require('../graphqlPubSub');

const ThreadModel = require('../../../db').Thread;

const decryptMessagingUserToken = require('../../../middlewares/MessagingUserAuth')
    .decryptMessagingUserToken;

module.exports.newMessageTopic = {
    key: 'new_message',
    publish: message =>
        GraphqlPubSub.publish('new_message', { newMessage: message }),
    newMessageFilter: async (payload, { threadId, messagingUserToken }) => {
        if (!payload || !payload.newMessage || !payload.newMessage.threadId) {
            return false;
        }

        if (threadId) {
            return payload && payload.newMessage.threadId === threadId;
        }

        if (messagingUserToken) {
            const thread = await ThreadModel.findByPk(
                payload.newMessage.threadId
            );

            const messagingUser = await decryptMessagingUserToken(
                messagingUserToken
            );

            if (
                !messagingUser ||
                thread.organizationId !== messagingUser.organizationId ||
                thread.messagingUserId !== messagingUser.id
            ) {
                return false;
            }

            return true;
        }

        return false;
    },
};
