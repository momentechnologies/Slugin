const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const BotReplyTrigger = sequelize.define('botReplyTrigger', {
        botReplyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sentence: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    BotReplyTrigger.associate = function(models) {};

    return BotReplyTrigger;
};
