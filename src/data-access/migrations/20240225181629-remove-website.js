'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return await queryInterface.removeColumn('Clinics', 'website');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Clinics', 'website', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
