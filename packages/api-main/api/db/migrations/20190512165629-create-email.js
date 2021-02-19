'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('emails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            outgoing: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            messageId: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            fromEmail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fromName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            toEmail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            original: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('emails');
    },
};
