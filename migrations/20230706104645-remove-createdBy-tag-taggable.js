"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("TagTaggables", "createdBy");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TagTaggables");
  },
};
