'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Clinics', [
      {
        name: 'clnica 1',
        cnpj: '71282422000145',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'clnica 1',
        cnpj: '95018551000199',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'clnica 1',
        cnpj: '85591699000164',
        website: 'www.clinica3.com.br',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Clinics', null, {});
  },
};
