'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.removeColumn('Addresses', 'number');
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn('Addresses', 'number', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    });
  },
};
