module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'organizationUserNotificationSettings',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                organizationId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                notificationName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                notificationType: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                canSend: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                },
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('organizationUserNotificationSettings');
    },
};
