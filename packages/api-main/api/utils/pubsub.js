const pubsub = require('../pubsub');

const getTopic = async topicName => {
    let topic = pubsub.topic(topicName);

    const [exists] = await topic.exists();

    if (!exists) {
        [topic] = await pubsub.createTopic(topicName);
    }

    return topic;
};

module.exports.getSubscription = async (topicName, subscriptionName) => {
    const topic = await getTopic(topicName);
    let subscription = topic.subscription(subscriptionName);

    const [exists] = await subscription.exists();

    if (!exists) {
        [subscription] = await topic.createSubscription(subscriptionName);
    }

    return subscription;
};

module.exports.publish = async (topicName, data) => {
    const topic = await getTopic(topicName);

    await topic.publish(Buffer.from(JSON.stringify(data)));
};
