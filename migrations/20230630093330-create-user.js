"use strict";

const { USER_MODEL_KEYWORDS } = require("../modelKeywords");
const { MODEL_NAME, ID, FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(MODEL_NAME, {
      [ID]: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      [FIRST_NAME]: {
        type: Sequelize.STRING,
      },
      [LAST_NAME]: {
        type: Sequelize.STRING,
      },
      [EMAIL]: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MODEL_NAME);
  },
};
