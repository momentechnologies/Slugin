const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('organization', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stripeId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        organizationKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });

    Organization.associate = function(models) {
        models.Organization.belongsToMany(models.User, {
            through: models.OrganizationUser,
        });
        models.Organization.hasMany(models.Thread);
        models.Organization.hasMany(models.OrganizationSetting, {
            as: 'settings',
        });
    };

    return Organization;
};
