const { PubSub } = require('@google-cloud/pubsub');
const appConfig = require('./config/app');

module.exports = new PubSub({
    projectId: appConfig.googleProjectId,
    keyFilename: '/secrets/pubsub/credentials.json',
});
