const PubSubUtils = require('../../utils/pubsub');
const newThreadTopic = require('../../routes/graphql/thread/subscriptions')
    .newThreadTopic;

module.exports = (hostname, pubsub) => {
    PubSubUtils.getSubscription(
        'new_thread',
        `new-thread-pod-${hostname}`
    ).then(subscription => {
        const messageHandler = message => {
            const thread = JSON.parse(message.data.toString());

            newThreadTopic.publish({
                ...thread,
                endedAt: thread.endedAt ? new Date(thread.endedAt) : null,
                updatedAt: new Date(thread.updatedAt),
                createdAt: new Date(thread.createdAt),
            });

            // "Ack" (acknowledge receipt of) the thread
            message.ack();
        };

        // Listen for new threads until timeout is hit
        subscription.on(`message`, messageHandler);
    });
};
