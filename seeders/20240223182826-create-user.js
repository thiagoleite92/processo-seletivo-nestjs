'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'email@email.com',
        name: 'admin',
        cpf: '07390384433',
        phoneNumber: '81983643305',
        password: bcrypt.hashSync('123123', 5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
