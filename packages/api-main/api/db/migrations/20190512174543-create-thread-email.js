'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('threadEmails', {
            threadId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            emailId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('threadEmails');
    },
};
