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
      firstName: 'Abhinav',
      lastName: 'Kumar',
      userName: 'abhi',
      password: 'e01a175361512792551e01e659162e18d99d0ab96e2550569381192f06c6f900ca70083f28a622569a2a1a00e0b8805a3fccb51ccf84b4c7ef4f74f87014efed', // bohemia
      salt: 'WdQbsD9lUE7PzG8wCDV/f4fwg4/fAr+Jvnrf3i/yjFOVvPuE/oyUCD2YxTCaD2JHGuP+d7vPSEK5lODFabR9WUHT9fgxxXA6OTs+b3xVGeE4qZAD3fyMGLuOFfnepHpM6UB/L69OrJr+SMTYDEMqfbUmbW03GlqAdIthi+ROl/0=',
      email: 'kumarabhinav@gmail.com',
      phoneNumber: '9896360087',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users'), // eslint-disable-line
};
