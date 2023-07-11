module.exports = class AuthenticationError extends Error {
  constructor(message = "You are not authenticate", errorType = "AUTH_ERROR") {
    super();
    this.message = message;
    this.errorType = errorType;
  }
};
