const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        emailConfirmed: {
            type: DataTypes.BOOLEAN,
        },
        newsletterText: {
            type: DataTypes.STRING,
            nullable: true,
        },
    });

    User.associate = function(models) {
        models.User.belongsToMany(models.Organization, {
            through: models.OrganizationUser,
        });
    };

    return User;
};
