const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const BotReply = sequelize.define('botReply', {
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        replyText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    BotReply.associate = function(models) {};

    return BotReply;
};
