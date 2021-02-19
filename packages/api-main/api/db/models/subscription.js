module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('subscription', {
        organizationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        from: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        to: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        lastPayment: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    Subscription.associate = function(models) {};

    return Subscription;
};
