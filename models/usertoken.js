"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { USER_ID } = USER_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class UserToken extends Model {
    static associate(models) {
      UserToken.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  UserToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UserTokens",
    }
  );
  return UserToken;
};
