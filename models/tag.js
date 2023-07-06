"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  TAG_MODEL_KEYWORDS,
  TAG_TAGGABLE_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, NAME } = TAG_MODEL_KEYWORDS;
const { TAG_ID, TAGGABLE_ID } = TAG_TAGGABLE_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Image, {
        through: {
          model: models.TagTaggable,
          unique: false,
        },
        foreignKey: TAG_ID,
        constraints: false,
        otherKey: TAGGABLE_ID, // Add this line
        as: "images",
      });
      Tag.belongsToMany(models.Video, {
        through: {
          model: models.TagTaggable,
          unique: false,
        },
        foreignKey: TAG_ID,
        constraints: false,
        otherKey: TAGGABLE_ID, // Add this line
        as: "videos",
      });
    }
  }
  Tag.init(
    {
      [ID]: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      [NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );
  return Tag;
};
