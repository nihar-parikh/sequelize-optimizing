"use strict";
const {
  ROLE_PERMISSION_MODEL_KEYWORDS,
  ROLE_MODEL_KEYWORDS,
  PERMISSION_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, ROLE_ID, PERMISSION_ID } =
  ROLE_PERMISSION_MODEL_KEYWORDS;
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(MODEL_NAME, {
      [ID]: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      [ROLE_ID]: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: ROLE_MODEL_KEYWORDS.MODEL_NAME,
          key: "id",
        },
      },
      [PERMISSION_ID]: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: PERMISSION_MODEL_KEYWORDS.MODEL_NAME,
          key: "id",
        },
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
