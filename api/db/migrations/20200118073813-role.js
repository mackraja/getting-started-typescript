'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable(
        'Roles',
        {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            name: { type: Sequelize.STRING(64), allowNull: false },
            status: { type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false },
            isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        }),
    down: (queryInterface) => queryInterface.dropTable('Roles'),
};
