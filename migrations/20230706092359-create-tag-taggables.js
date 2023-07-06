"use strict";
const {
  TAG_TAGGABLE_MODEL_KEYWORDS,
  TAG_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, TAG_ID, TAGGABLE_ID, TAGGABLE_TYPE } =
  TAG_TAGGABLE_MODEL_KEYWORDS;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        MODEL_NAME,
        {
          [ID]: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            unique: true,
          },
          [TAG_ID]: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: TAG_MODEL_KEYWORDS.MODEL_NAME,
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          [TAGGABLE_ID]: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          [TAGGABLE_TYPE]: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          // Add additional columns
          createdBy: {
            allowNull: false,
            type: Sequelize.UUID,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          // Add constraints
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );

      await queryInterface.addConstraint(
        MODEL_NAME,
        {
          fields: [TAG_ID, TAGGABLE_ID, TAGGABLE_TYPE],
          type: "unique",
          name: "taggable_unique_constraint",
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        MODEL_NAME,
        "taggable_unique_constraint",
        { transaction }
      );
      await queryInterface.dropTable(MODEL_NAME, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
