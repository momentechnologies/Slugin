const bcrypt = require('bcryptjs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const password = bcrypt.hashSync('admin', 10);
        return Promise.all([
            queryInterface.bulkInsert(
                'users',
                [
                    {
                        firstName: 'Ola',
                        lastName: 'Nordmann',
                        email: 'admin@admin.no',
                        password: password,
                        emailConfirmed: true,
                        createdAt: Math.floor(Date.now() / 1000),
                        updatedAt: Math.floor(Date.now() / 1000),
                    },
                ],
                {}
            ),
            queryInterface.bulkInsert(
                'organizations',
                [
                    {
                        name: 'Moment Technologies AS',
                        organizationKey: 'testkey',
                        createdAt: Math.floor(Date.now() / 1000),
                        updatedAt: Math.floor(Date.now() / 1000),
                    },
                ],
                {}
            ),
            queryInterface.bulkInsert(
                'organizationUsers',
                [
                    {
                        organizationId: 1,
                        userId: 1,
                        role: 'admin',
                    },
                ],
                {}
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
