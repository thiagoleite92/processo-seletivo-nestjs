'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Addresses', 'number', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: true,
    });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('Addresses', 'number');
  },
};
