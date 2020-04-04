'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      name: 'superAdmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles'),
};
