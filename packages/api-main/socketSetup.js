const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const os = require('os');
const PubSubUtils = require('./api/utils/pubsub');

const directoryPath = path.join(__dirname, '/api/apiPubSubListeners/');

module.exports = () => {
    const hostname = os.hostname();

    // start all listeners in api/apiPubSubListeners folder
    fs.readdirSync(directoryPath)
        .filter(file => {
            return fs.lstatSync(path.join(directoryPath, file)).isDirectory();
        })
        .forEach(file => require(directoryPath + file)(hostname, PubSubUtils));
};
