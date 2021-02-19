module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            stripeId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            organizationId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            last4: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            expiresMonth: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            expiresYear: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            primary: {
                type: Sequelize.BOOLEAN,
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
        return queryInterface.dropTable('cards');
    },
};
