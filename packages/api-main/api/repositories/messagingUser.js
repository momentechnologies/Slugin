const Sequelize = require('sequelize');
const MessagingUser = require('../db').MessagingUser;

module.exports.findClientFromMeta = async (organizationId, meta = []) => {
    return await MessagingUser.findOne({
        where: { organizationId, [Sequelize.Op.or]: meta },
    });
};

module.exports.findById = async id => {
    return await MessagingUser.findByPk(id);
};

module.exports.create = async messagingUser => {
    return await MessagingUser.create(messagingUser);
};
