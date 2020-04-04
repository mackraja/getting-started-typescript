'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      roleId: 1,
      firstName: 'Monty',
      lastName: 'Khanna',
      userName: 'mack',
      password: '',
      email: 'montykhanna007@hotmail.com',
      phoneNumber: '9896360087',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      roleId: 2,
      firstName: 'Abhinav',
      lastName: 'Kumar',
      userName: 'abhi',
      password: '',
      email: 'kumarabhinav00@gmail.com',
      phoneNumber: '9896360087',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users'), // eslint-disable-line
};
