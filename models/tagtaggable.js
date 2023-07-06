"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { TAG_TAGGABLE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, TAG_ID, TAGGABLE_ID, TAGGABLE_TYPE } =
  TAG_TAGGABLE_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class TagTaggable extends Model {
    static associate(models) {}
  }
  TagTaggable.init(
    {
      [ID]: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      [TAG_ID]: {
        type: DataTypes.UUID,
        unique: "taggable_unique_constraint",
      },
      [TAGGABLE_ID]: {
        type: DataTypes.UUID,
        unique: "taggable_unique_constraint",
        references: null,
      },
      [TAGGABLE_TYPE]: {
        type: DataTypes.STRING,
        unique: "taggable_unique_constraint",
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return TagTaggable;
};
