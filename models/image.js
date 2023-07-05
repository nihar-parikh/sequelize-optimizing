"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  IMAGE_MODEL_KEYWORDS,
  USER_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, TITLE, URL, USER_ID } = IMAGE_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: USER_ID,
        as: "user",
      });
    }
  }

  Image.init(
    {
      [ID]: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      [TITLE]: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      [URL]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [USER_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: USER_MODEL_KEYWORDS.MODEL_NAME,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return Image;
};
