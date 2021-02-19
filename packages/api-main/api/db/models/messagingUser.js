const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const MessagingUser = sequelize.define('messagingUser', {
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastSeen: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    MessagingUser.associate = function(models) {
        models.MessagingUser.hasOne(models.Thread);
    };

    return MessagingUser;
};
