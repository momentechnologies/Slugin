const mongoose = require('mongoose');
const dbConfig = require('./api/config/db');

const script = require('./pubsubListeners/' + process.argv[2]);

mongoose
    .connect(dbConfig.connectionString)
    .then(t => {
        script();
    })
    .catch(e => {
        console.log(e);
        process.exit();
    });
