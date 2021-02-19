const PubSubUtils = require('../api/utils/pubsub');

module.exports = () => {
    PubSubUtils.getSubscription('message', 'bot_listener').then(
        subscription => {
            const messageHandler = message => {
                const threadMessage = JSON.parse(message.data.toString());

                if (!threadMessage.isFromClient) {
                    return message.ack();
                }
            };

            // Listen for new messages until timeout is hit
            subscription.on(`message`, messageHandler);
        }
    );
};
