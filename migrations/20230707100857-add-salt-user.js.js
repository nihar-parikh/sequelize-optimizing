"use strict";

const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, SALT } = USER_MODEL_KEYWORDS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(MODEL_NAME, SALT, {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(MODEL_NAME, SALT);
  },
};
