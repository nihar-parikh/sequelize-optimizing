const databaseKeywords = require("./databaseKeywords");

module.exports = {
  development: {
    username: databaseKeywords.DATABASE_USERNAME,
    password: databaseKeywords.DATABASE_PASSWORD,
    database: databaseKeywords.DATABASE_NAME,
    host: databaseKeywords.DATABASE_HOST,
    dialect: databaseKeywords.DATABASE_DIALECT,
  },
  qa: {
    username: databaseKeywords.DATABASE_USERNAME,
    password: databaseKeywords.DATABASE_PASSWORD,
    database: databaseKeywords.DATABASE_NAME,
    host: databaseKeywords.DATABASE_HOST,
    dialect: databaseKeywords.DATABASE_DIALECT,
  },
  staging: {
    username: databaseKeywords.DATABASE_USERNAME,
    password: databaseKeywords.DATABASE_PASSWORD,
    database: databaseKeywords.DATABASE_NAME,
    host: databaseKeywords.DATABASE_HOST,
    dialect: databaseKeywords.DATABASE_DIALECT,
  },
  production: {
    username: databaseKeywords.DATABASE_USERNAME,
    password: databaseKeywords.DATABASE_PASSWORD,
    database: databaseKeywords.DATABASE_NAME,
    host: databaseKeywords.DATABASE_HOST,
    dialect: databaseKeywords.DATABASE_DIALECT,
  },
};
