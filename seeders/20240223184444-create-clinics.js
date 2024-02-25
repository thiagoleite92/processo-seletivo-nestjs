'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
      {
        cep: '50711180',
        state: 'pe',
        city: 'recife',
        street: 'eliseu cavalcanti',
        district: 'cordeiro',

        number: 246,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cep: '50711181',
        state: 'pe',
        city: 'recife',
        street: 'eliseu magalhaes',
        district: 'cordeiro',
        number: 222,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cep: '50711181',
        state: 'pe',
        city: 'recife',
        street: 'desembargador rodolfo aureliano',
        district: 'várzea',
        number: 176,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const [{ id: id1 }, { id: id2 }, { id: id3 }] = await queryInterface.select(Sequelize.Model.Addresses, 'Addresses', {});

    return queryInterface.bulkInsert('Clinics', [
      {
        name: 'clnica 1',
        cnpj: '71282422000145',
        phone: '34545151',
        ownerName: 'Thiago Leite',
        createdAt: new Date(),
        updatedAt: new Date(),
        addressId: id1,
      },
      {
        name: 'clnica 1',
        cnpj: '95018551000199',
        phone: '81983643305',
        ownerName: 'Jonas MAscarenhas',
        createdAt: new Date(),
        updatedAt: new Date(),
        addressId: id2,
      },
      {
        name: 'clnica 1',
        cnpj: '85591699000164',
        website: 'www.clinica3.com.br',
        phone: '891274679',
        ownerName: 'Alberico Leite',
        createdAt: new Date(),
        updatedAt: new Date(),
        addressId: id3,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Clinics', null, {});

    return queryInterface.bulkDelete('Addresses', null, {});
  },
};
