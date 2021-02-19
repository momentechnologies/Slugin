module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('analyticsPageViews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            analyticsUserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            domainId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            path: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('analyticsPageViews');
    },
};
