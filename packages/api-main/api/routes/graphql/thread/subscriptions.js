const GraphqlPubSub = require('../graphqlPubSub');

module.exports.newThreadTopic = {
    key: 'new_thread',
    publish: thread =>
        GraphqlPubSub.publish('new_thread', { newThread: thread }),
};
