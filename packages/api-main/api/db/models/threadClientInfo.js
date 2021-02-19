const now = require('../../utils/date').now;

module.exports = (sequelize, DataTypes) => {
    const ThreadClientInfo = sequelize.define('threadClientInfo', {
        threadId: {
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

    ThreadClientInfo.associate = function(models) {
        // associations can be defined here
    };

    return ThreadClientInfo;
};
