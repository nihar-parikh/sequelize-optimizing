"use strict";
const { COMMENT_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, TITLE, COMMENTABLE_ID, COMMENTABLE_TYPE } =
  COMMENT_MODEL_KEYWORDS;

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
      [COMMENTABLE_ID]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [COMMENTABLE_TYPE]: {
        type: Sequelize.STRING,
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
