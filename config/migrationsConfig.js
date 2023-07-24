const {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
  DATABASE_MIGRATION_TABLE_NAME,
} = require("./databaseKeywords");

module.exports = {
  development: {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    migrationStorageTableName: DATABASE_MIGRATION_TABLE_NAME,
  },
  qa: {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    migrationStorageTableName: DATABASE_MIGRATION_TABLE_NAME,
  },
  staging: {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    migrationStorageTableName: DATABASE_MIGRATION_TABLE_NAME,
  },
  production: {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    migrationStorageTableName: DATABASE_MIGRATION_TABLE_NAME,
  },
};
