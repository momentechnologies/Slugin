module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('organizationDomains', {
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
            domain: {
                type: Sequelize.STRING,
                allowNull: false,
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
        return queryInterface.dropTable('organizationDomains');
    },
};
