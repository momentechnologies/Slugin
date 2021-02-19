const request = require('request');

module.exports = data => {
    return new Promise((resolve, reject) => {
        request.get(data, (err, response) => {
            if (err) {
                return reject(err);
            }
            resolve(response);
        });
    });
};
