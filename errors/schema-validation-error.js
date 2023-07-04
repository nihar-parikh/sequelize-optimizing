module.exports = class SchemaValidationError extends Error {
  constructor(message, errorType = "SCHEMA_VALIDATION_ERROR") {
    super();
    this.message = message;
    this.errorType = errorType;
  }
};
