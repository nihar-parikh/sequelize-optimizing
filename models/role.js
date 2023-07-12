"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { ROLE_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, ROLE_NAME } = ROLE_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {}
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
