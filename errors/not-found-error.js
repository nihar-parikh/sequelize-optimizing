module.exports = class NotFoundError extends Error {
  constructor (message, errorType = 'NOT_FOUND_ERROR') {
    super()
    this.message = message
    this.errorType = errorType
  }
}
