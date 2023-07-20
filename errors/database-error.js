module.exports = class DataBaseError extends Error {
  constructor(message, errorType) {
    super();
    this.message = message;
    this.errorType = errorType;
  }
};
