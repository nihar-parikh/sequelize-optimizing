const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

exports.DATABASE_NAME = process.env.DB_NAME;
exports.DATABASE_HOST = process.env.DB_HOST;
exports.DATABASE_USERNAME = process.env.DB_USERNAME;
exports.DATABASE_PASSWORD = process.env.DB_PASSWORD;
exports.DATABASE_DIALECT = process.env.DB_DIALECT;
exports.DATABASE_MIGRATION_TABLE_NAME = process.env.DB_MIGRATION_TABLE_NAME;
