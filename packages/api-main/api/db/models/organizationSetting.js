const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const OrganizationSetting = sequelize.define('organizationSetting', {
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    OrganizationSetting.associate = function(models) {
        // associations can be defined here
    };

    return OrganizationSetting;
};
