const { DataBaseError } = require("../errors");
const db = require("../models");
const { sequelize } = db;

const syncDB = async () => {
  // sync db
  try {
    await sequelize.sync();
    console.log("Database sync completed successfully.");
  } catch (error) {
    console.error("Error synchronizing the database: ", error);
    throw new DataBaseError(
      "Error synchronizing the database.",
      "DB_SYNC_ERROR"
    );
  }
};

module.exports = { syncDB };
