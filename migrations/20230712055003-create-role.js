"use strict";
const { ROLE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, ROLE_NAME } = ROLE_MODEL_KEYWORDS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(MODEL_NAME, {
      [ID]: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      [ROLE_NAME]: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(MODEL_NAME);
  },
};
