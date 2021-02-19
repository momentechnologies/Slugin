module.exports = (sequelize, DataTypes) => {
    const AnalyticsPageView = sequelize.define(
        'analyticsPageView',
        {
            analyticsUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            domainId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            updatedAt: false,
        }
    );

    AnalyticsPageView.associate = function(models) {};

    return AnalyticsPageView;
};
