module.exports = findAndCountAllResponse => ({
    count: findAndCountAllResponse.count,
    data: findAndCountAllResponse.rows,
});
