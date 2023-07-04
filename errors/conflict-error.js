module.exports = class ConflictError extends Error {
  constructor (message = 'Request could not be processed because of conflict in the request', errorType = 'CONFLICT_ERROR') {
    super()
    this.message = message
    this.errorType = errorType
  }
}
