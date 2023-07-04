module.exports = class RequestValidationError extends Error {
  constructor(
    message = "Request validation failed",
    errorType = "REQUEST_VALIDATION_ERROR"
  ) {
    super();
    this.message = message;
    this.errorType = errorType;
  }
};
