module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'message',
        {
            threadId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            isFromClient: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            clientSeen: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            clientNotified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            linkedEmailId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    );

    Message.associate = function(models) {
        models.Message.belongsTo(models.Thread);
    };

    return Message;
};
