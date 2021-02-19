const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('card', {
        stripeId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        last4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresMonth: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiresYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        primary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    Card.associate = function(models) {};

    return Card;
};
