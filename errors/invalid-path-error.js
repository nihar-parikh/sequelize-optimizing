module.exports = class InvalidPathError extends Error {
  constructor(message, errorType = "INVALID_PATH_ERROR") {
    super();
    this.message = message;
    this.errorType = errorType;
  }
};
