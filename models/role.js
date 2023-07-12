"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  ROLE_MODEL_KEYWORDS,
  USER_MODEL_KEYWORDS,
  ROLE_PERMISSION_MODEL_KEYWORDS,
} = require("../shared/modelKeywords");
const { MODEL_NAME, ID, ROLE_NAME } = ROLE_MODEL_KEYWORDS;
const { ROLE_ID } = USER_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: ROLE_ID,
        as: "users",
      });
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: ROLE_PERMISSION_MODEL_KEYWORDS.ROLE_ID,
        as: "permissions",
      });
    }
  }

  Role.init(
    {
      [ID]: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      [ROLE_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return Role;
};
