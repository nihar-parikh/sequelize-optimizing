"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { PERMISSION_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, PERMISSION_NAME, ACTION } = PERMISSION_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {}
  }

  Permission.init(
    {
      [ID]: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      [PERMISSION_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      [ACTION]: {
        type: DataTypes.ENUM("create", "read", "update", "delete"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return Permission;
};
