"use strict";

const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, PASSWORD } = USER_MODEL_KEYWORDS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(MODEL_NAME, PASSWORD, {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [6, 255], // Minimum and maximum password length
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(MODEL_NAME, PASSWORD);
  },
};
