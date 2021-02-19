const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const OrganizationDomain = sequelize.define('organizationDomain', {
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    OrganizationDomain.associate = function(models) {
        // associations can be defined here
    };

    return OrganizationDomain;
};
