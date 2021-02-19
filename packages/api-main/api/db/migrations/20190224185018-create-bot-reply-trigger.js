module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('botReplyTriggers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            botReplyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sentence: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('botReplyTriggers');
    },
};
