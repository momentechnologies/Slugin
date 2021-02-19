const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const OrganizationUserNotificationSetting = sequelize.define(
        'organizationUserNotificationSetting',
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            organizationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            notificationName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            notificationType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            canSend: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        }
    );

    OrganizationUserNotificationSetting.associate = function(models) {
        // associations can be defined here
    };

    return OrganizationUserNotificationSetting;
};
