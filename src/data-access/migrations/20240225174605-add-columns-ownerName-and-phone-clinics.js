'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Clinics', 'ownerName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Clinics', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    return;
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Clinics', 'ownerName');
    await queryInterface.removeColumn('Clinics', 'phone');
  },
};
