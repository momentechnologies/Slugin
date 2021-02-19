module.exports = (sequelize, DataTypes) => {
    const AnalyticsUser = sequelize.define('analyticsUser', {
        messagingUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    AnalyticsUser.associate = function(models) {};

    return AnalyticsUser;
};
