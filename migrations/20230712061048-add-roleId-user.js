"use strict";

const {
  USER_MODEL_KEYWORDS,
  ROLE_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ROLE_ID } = USER_MODEL_KEYWORDS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(MODEL_NAME, ROLE_ID, {
      type: Sequelize.UUID,
      references: {
        model: ROLE_MODEL_KEYWORDS.MODEL_NAME,
        key: "id",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(MODEL_NAME, ROLE_ID);
  },
};
