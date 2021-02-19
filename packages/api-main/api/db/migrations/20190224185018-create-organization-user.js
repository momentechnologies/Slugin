module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('organizationUsers', {
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
            role: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('organizationUsers');
    },
};
