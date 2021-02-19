const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const OrganizationInitialMessage = sequelize.define(
        'organizationInitialMessage',
        {
            organizationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    );

    OrganizationInitialMessage.associate = function(models) {
        models.OrganizationInitialMessage.belongsTo(models.Organization);
    };

    return OrganizationInitialMessage;
};
