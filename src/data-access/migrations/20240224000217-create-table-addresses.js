'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        unique: false,
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      city: {
        unique: false,
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        unique: false,
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        unique: false,
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        unique: false,
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('Addresses');
  },
};
