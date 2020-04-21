'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable(
        'Users',
        {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            roleId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    onDelete: null,
                    references: {
                            model: 'Roles',
                            key: 'id',
                    },
            },
            firstName: { type: Sequelize.STRING(64), allowNull: false },
            lastName: { type: Sequelize.STRING(64), allowNull: true },
            userName: { type: Sequelize.STRING(64), allowNull: false },
            password: { type: Sequelize.STRING, allowNull: false },
            salt: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, unique: true, allowNull: true },
            emailVerified: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
            phoneNumber: { type: Sequelize.STRING(32), allowNull: true },
            status: { type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false },
            isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        }),
    down: (queryInterface) => queryInterface.dropTable('Users'),
};
