// "use strict";

// const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
// const { MODEL_NAME, ID, FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable(MODEL_NAME, {
//       [ID]: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         primaryKey: true,
//         unique: true,
//       },
//       [FIRST_NAME]: {
//         type: Sequelize.STRING,
//       },
//       [LAST_NAME]: {
//         type: Sequelize.STRING,
//       },
//       [EMAIL]: {
//         type: Sequelize.STRING,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable(MODEL_NAME);
//   },
// };

"use strict";

const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { MODEL_NAME, ID, FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(MODEL_NAME, {
      [ID]: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      [FIRST_NAME]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [LAST_NAME]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      [EMAIL]: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add validations and constraints
    await queryInterface.addConstraint(MODEL_NAME, {
      fields: [FIRST_NAME],
      type: "check",
      where: {
        [FIRST_NAME]: {
          [Sequelize.Op.not]: null,
          [Sequelize.Op.not]: "",
        },
      },
    });

    await queryInterface.addConstraint(MODEL_NAME, {
      fields: [LAST_NAME],
      type: "check",
      where: {
        [LAST_NAME]: {
          [Sequelize.Op.not]: null,
          [Sequelize.Op.not]: "",
        },
      },
    });

    await queryInterface.addConstraint(MODEL_NAME, {
      fields: [EMAIL],
      type: "unique",
      name: "email",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MODEL_NAME);
  },
};
