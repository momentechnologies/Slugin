module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('threads', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            organizationId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            messagingUserId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            assignedUserId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            endedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('threads');
    },
};
