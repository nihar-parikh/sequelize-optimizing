"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  USER_MODEL_KEYWORDS,
  IMAGE_MODEL_KEYWORDS,
  VIDEO_MODEL_KEYWORDS,
  ROLE_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const {
  MODEL_NAME,
  ID,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PASSWORD,
  SALT,
  ROLE_ID,
  USER_ID,
} = USER_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserToken, {
        foreignKey: "userId",
        as: "token",
      });
      User.belongsTo(models.Role, {
        foreignKey: ROLE_ID,
        as: "role",
      });
      User.hasMany(models.Image, {
        foreignKey: IMAGE_MODEL_KEYWORDS.USER_ID,
        as: "images",
      });
      User.hasMany(models.Video, {
        foreignKey: VIDEO_MODEL_KEYWORDS.USER_ID,
        as: "videos",
      });
    }
    toJSON() {
      const values = { ...this.get() };
      delete values[PASSWORD];
      delete values[SALT];
      return values;
    }
  }

  User.init(
    {
      [ID]: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      [FIRST_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      [LAST_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      [EMAIL]: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      [PASSWORD]: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [6, 255], // Minimum and maximum password length
        },
      },
      [SALT]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return User;
};
