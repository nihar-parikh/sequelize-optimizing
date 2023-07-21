// const dotenv = require("dotenv");
// const { DataBaseError } = require("../errors");

// console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
// // Load the environment-specific .env file based on the NODE_ENV value
// if (process.env.NODE_ENV === "development") {
//   dotenv.config({ path: ".env.development" });
// } else if (process.env.NODE_ENV === "qa") {
//   dotenv.config({ path: ".env.qa" });
// } else if (process.env.NODE_ENV === "staging") {
//   dotenv.config({ path: ".env.staging" });
// } else if (process.env.NODE_ENV === "production") {
//   dotenv.config({ path: ".env.production" });
// } else {
//   throw new DataBaseError(
//     "Invalid NODE_ENV value. Please set it to development, qa, staging, or production.",
//     "DB_CONNECTION_ERROR"
//   );
// }

// console.log(process.env.NODE_ENV);

// exports.DATABASE_NAME = process.env.DB_NAME;
// exports.DATABASE_HOST = process.env.DB_HOST;
// exports.DATABASE_USERNAME = process.env.DB_USERNAME;
// exports.DATABASE_PASSWORD = process.env.DB_PASSWORD;
// exports.DATABASE_DIALECT = process.env.DB_DIALECT;
// exports.DATABASE_MIGRATION_TABLE_NAME = process.env.DB_MIGRATION_TABLE_NAME;
// exports.JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
// exports.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
// exports.INITIALIZATION_VECTOR = process.env.INITIALIZATION_VECTOR;

const dotenv = require("dotenv");
const { DataBaseError } = require("../errors");

// Define a mapping of NODE_ENV values to their respective .env file paths
const envFilePaths = {
  development: ".env.development",
  qa: ".env.qa",
  staging: ".env.staging",
  production: ".env.production",
};
console.log("process.env.NODE_ENV>>>>>> ", process.env.NODE_ENV);
// Get the appropriate .env file path based on NODE_ENV or fallback to development
const envFilePath =
  envFilePaths[process.env.NODE_ENV] || envFilePaths.development;

// Load the environment-specific .env file
dotenv.config({ path: envFilePath });

// Ensure that NODE_ENV is set to one of the valid values
const validEnvironments = ["development", "qa", "staging", "production"];
if (!validEnvironments.includes(process.env.NODE_ENV)) {
  throw new DataBaseError(
    "Invalid NODE_ENV value. Please set it to development, qa, staging, or production.",
    "DB_CONNECTION_ERROR"
  );
}

// Export the environment variables
module.exports = {
  DATABASE_NAME: process.env.DB_NAME,
  DATABASE_HOST: process.env.DB_HOST,
  DATABASE_USERNAME: process.env.DB_USERNAME,
  DATABASE_PASSWORD: process.env.DB_PASSWORD,
  DATABASE_DIALECT: process.env.DB_DIALECT,
  DATABASE_MIGRATION_TABLE_NAME: process.env.DB_MIGRATION_TABLE_NAME,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  INITIALIZATION_VECTOR: process.env.INITIALIZATION_VECTOR,
};
