const {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
  DATABASE_MIGRATION_TABLE_NAME,
} = require("./databaseKeywords");
console.log({
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
  DATABASE_MIGRATION_TABLE_NAME,
});
module.exports = {
  production: {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    migrationStorageTableName: DATABASE_MIGRATION_TABLE_NAME,
  },
  development: {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    migrationStorageTableName: DATABASE_MIGRATION_TABLE_NAME,
  },
};
