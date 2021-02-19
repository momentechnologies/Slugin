'use strict';
module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define(
        'email',
        {
            outgoing: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            messageId: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            fromEmail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fromName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            toEmail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            original: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {}
    );
    Email.associate = function(models) {
        models.Email.belongsToMany(models.Thread, {
            through: models.ThreadEmail,
        });
    };
    return Email;
};
