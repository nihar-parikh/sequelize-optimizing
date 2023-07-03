// "use strict";
// const { Model } = require("sequelize");
// const { v4: uuidv4 } = require("uuid");
// const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
// const { MODEL_NAME, ID, FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {}
//   }
//   User.init(
//     {
//       [ID]: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: () => uuidv4(), // Generate UUID automatically
//         allowNull: false,
//       },
//       [FIRST_NAME]: DataTypes.STRING,
//       [LAST_NAME]: DataTypes.STRING,
//       [EMAIL]: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: MODEL_NAME,
//     }
//   );
//   return User;
// };

"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
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
          len: [1, 255],
        },
      },
      [LAST_NAME]: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
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
    },
    {
      sequelize,
      modelName: MODEL_NAME,
    }
  );

  return User;
};
