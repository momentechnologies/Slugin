module.exports.now = () => Math.round(Date.now() / 1000);

module.exports.momentToTimestamp = momentObject => momentObject.unix();
module.exports.toUnix = date =>
    date ? Math.floor(date.getTime() / 1000) : date;
