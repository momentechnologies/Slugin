const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const OrganizationUser = sequelize.define(
        'organizationUser',
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            organizationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false }
    );

    OrganizationUser.associate = function(models) {};

    return OrganizationUser;
};
