"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  VIDEO_MODEL_KEYWORDS,
  USER_MODEL_KEYWORDS,
  COMMENT_MODEL_KEYWORDS,
  TAG_TAGGABLE_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, TITLE, URL, USER_ID } = VIDEO_MODEL_KEYWORDS;
const { COMMENTABLE_ID, COMMENTABLE_TYPE } = COMMENT_MODEL_KEYWORDS;
const { TAGGABLE_ID, TAGGABLE_TYPE, TAG_ID } = TAG_TAGGABLE_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      Video.belongsTo(models.User, {
        foreignKey: USER_ID,
        as: "user",
      });
      Video.hasMany(models.Comment, {
        foreignKey: COMMENTABLE_ID, //necessary otherwise imageId column will be created.
        constraints: false, //necessary if two or more foreign keys refers are in same table.
        scope: {
          //providing scope here eliminates where clause
          [COMMENTABLE_TYPE]: "video",
        },
        as: "comments",
      });
      Video.belongsToMany(models.Tag, {
        through: {
          model: models.TagTaggable,
          unique: false,
          scope: {
            [TAGGABLE_TYPE]: "video",
          },
        },
        foreignKey: TAGGABLE_ID,
        constraints: false,
        otherKey: TAG_ID, // Add this line
        as: "tags", // Add this line
      });
    }
  }

  Video.init(
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

  return Video;
};
