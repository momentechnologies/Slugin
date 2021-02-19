const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const Thread = sequelize.define('thread', {
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        messagingUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        assignedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        endedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    Thread.associate = function(models) {
        models.Thread.hasMany(models.ThreadClientInfo);
        models.Thread.belongsTo(models.Organization);
        models.Thread.hasMany(models.Message);
        models.Thread.belongsTo(models.MessagingUser);
        models.Thread.belongsToMany(models.Email, {
            through: models.ThreadEmail,
        });
    };

    return Thread;
};
