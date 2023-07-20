const { DataBaseError } = require("../errors");
const db = require("../models");
const { sequelize } = db;

const verifyDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    throw new DataBaseError(
      "Error connecting to the database.",
      "DB_CONNECTION_ERROR"
    );
  }
};
module.exports = { verifyDBConnection };
