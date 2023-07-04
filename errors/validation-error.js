module.exports = class ValidationError extends Error {
  constructor (message, errorType = 'BAD_REQUEST_ERROR') {
    super()
    this.message = message
    this.errorType = errorType
  }
}
