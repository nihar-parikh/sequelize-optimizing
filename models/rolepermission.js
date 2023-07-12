"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  ROLE_MODEL_KEYWORDS,
  PERMISSION_MODEL_KEYWORDS,
  ROLE_PERMISSION_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, ROLE_ID, PERMISSION_ID } =
  ROLE_PERMISSION_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {}
  }

  RolePermission.init(
    {
      [ID]: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      [ROLE_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: ROLE_MODEL_KEYWORDS.MODEL_NAME,
          key: "id",
        },
      },
      [PERMISSION_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: PERMISSION_MODEL_KEYWORDS.MODEL_NAME,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return RolePermission;
};
