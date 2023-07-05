"use strict";
const {
  IMAGE_MODEL_KEYWORDS,
  USER_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, TITLE, URL, USER_ID } = IMAGE_MODEL_KEYWORDS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(MODEL_NAME, {
      [ID]: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      [TITLE]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [URL]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [USER_ID]: {
        type: Sequelize.UUID,
        references: {
          model: USER_MODEL_KEYWORDS.MODEL_NAME,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
