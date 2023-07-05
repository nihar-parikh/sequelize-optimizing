"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { COMMENT_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, TITLE, COMMENTABLE_ID, COMMENTABLE_TYPE } =
  COMMENT_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Image, {
        foreignKey: COMMENTABLE_ID,
        constraints: false,
        as: "image",
      });
      Comment.belongsTo(models.Video, {
        foreignKey: COMMENTABLE_ID,
        constraints: false,
        as: "video",
      });
    }
  }

  Comment.init(
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
      [COMMENTABLE_ID]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [COMMENTABLE_TYPE]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return Comment;
};
