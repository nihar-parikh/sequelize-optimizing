"use strict";
const { PERMISSION_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, PERMISSION_NAME, ACTION } = PERMISSION_MODEL_KEYWORDS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(MODEL_NAME, {
      [ID]: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      [PERMISSION_NAME]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [ACTION]: {
        type: Sequelize.ENUM("create", "read", "update", "delete"),
        allowNull: false,
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
