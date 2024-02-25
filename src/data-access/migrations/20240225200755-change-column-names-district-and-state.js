'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Addresses', 'district');
    await queryInterface.removeColumn('Addresses', 'state');

    await queryInterface.addColumn('Addresses', 'neighborhood', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Addresses', 'uf', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Addresses', 'complement', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Addresses', 'district', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Addresses', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn('Addresses', 'neighborhood');
    await queryInterface.removeColumn('Addresses', 'uf');
    await queryInterface.removeColumn('Addresses', 'complement');
  },
};
