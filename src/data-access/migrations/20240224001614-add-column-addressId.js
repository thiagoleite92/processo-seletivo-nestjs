'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Clinics', 'addressId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Addresses',
        key: 'id',
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('Clinics', 'addressId');
  },
};
