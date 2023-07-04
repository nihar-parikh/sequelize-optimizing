module.exports = class AccessDeniedError extends Error {
  constructor(message = 'Access denied', errorType = 'FORBIDDEN_ERROR') {
    super()
    this.message = message
    this.errorType = errorType
  }
}
