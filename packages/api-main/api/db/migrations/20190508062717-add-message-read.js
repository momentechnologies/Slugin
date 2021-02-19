module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('messages', 'clientSeen', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            }),
            queryInterface.addColumn('messages', 'clientNotified', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            }),
            queryInterface.addColumn('messages', 'linkedEmailId', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
        ]);
    },

    down: queryInterface => {
        return Promise.all([
            queryInterface.removeColumn('messages', 'clientSeen'),
            queryInterface.removeColumn('messages', 'clientNotified'),
            queryInterface.removeColumn('messages', 'linkedEmailId'),
        ]);
    },
};
