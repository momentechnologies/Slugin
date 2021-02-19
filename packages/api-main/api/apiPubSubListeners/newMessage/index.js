const PubSubUtils = require('../../utils/pubsub');
const MessageService = require('../../services/message');
const newMessageTopic = require('../../routes/graphql/message/subscriptions')
    .newMessageTopic;
const sendNotifications = require('./sendNotifications');

module.exports = (hostname, pubsub) => {
    PubSubUtils.getSubscription('message', `send-notifications`).then(
        subscription => {
            const messageHandler = message => {
                sendNotifications(message).then(() => {
                    message.ack();
                });
            };

            // Listen for new messages until timeout is hit
            subscription.on(`message`, messageHandler);
        }
    );

    PubSubUtils.getSubscription('message', `message-pod-${hostname}`).then(
        subscription => {
            const messageHandler = message => {
                const threadMessage = JSON.parse(message.data.toString());

                newMessageTopic.publish({
                    ...threadMessage,
                    date: new Date(threadMessage.date),
                });

                // "Ack" (acknowledge receipt of) the message
                message.ack();
            };

            // Listen for new messages until timeout is hit
            subscription.on(`message`, messageHandler);
        }
    );

    PubSubUtils.getSubscription(
        'predicted_message',
        `predicted_message_subscriber`
    ).then(subscription => {
        const messageHandler = message => {
            const predictedMessage = JSON.parse(message.data.toString());

            console.log(predictedMessage);
            MessageService.createBotMessage(
                predictedMessage.botReplyId,
                predictedMessage.id,
                predictedMessage.threadId
            ).then(() => {
                message.ack();
            });
        };

        // Listen for new messages until timeout is hit
        subscription.on(`message`, messageHandler);
    });
};
