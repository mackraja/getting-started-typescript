'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      roleId: 1,
      firstName: 'Monty',
      lastName: 'Khanna',
      userName: 'mack',
      password: 'a144f345c13be7211327f86167da12407bc63ec2cbd308375e12237b1c8ccc5ab32a4bedb81fce08cccf19def91ca57faf90df0c135d97b8f1393c07ae95a87e', // bohemia
      salt: '6xU+uMExME+lL66i2JrfHbNzYyTMZP/jyBhh0eSXSqGbaJPpzBs+AERjXGhV9W3IklU5rvEXYNSWzC1uj+9MIAhGD6vaNxJvZLdP1FrII3SDi8+vnJ1v2U1hrWcimI/H8icsTn/VM2npB82LStXb564P7uzfvz2R5M9NRTwOLUg=',
      email: 'montykhanna007@hotmail.com',
      phoneNumber: '9896360087',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      roleId: 2,
      firstName: 'bob',
      lastName: 'marle',
      userName: 'bob',
      password: '694d2d56d6f97f294b127789a157ea91e1f4ef5e455d6c7f483e3ca1927b8a8e8efbf58a0855166e0b42609182bf285c6bc38ec8781e889a1e378d8b4a81090e', // bob
      salt: 'HS6Yy3TXK32U3DYpgLpuHj2F9bVxlB8J/VHyVy8HNFmVSnl67s/O1fFqxKLZlo+zrOIuOcTPAu6LN60ia1MZUDGMqRHKGvyl/JgiyvosuLqbdPIAKoFtPHbTZjxxVM1X5zVUA7cNN9Zd/gPotguFk9beTgrYlvBuq8bFsqdqHk4=',
      email: 'kumarabhinav@gmail.com',
      phoneNumber: '9896360087',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users'), // eslint-disable-line
};
