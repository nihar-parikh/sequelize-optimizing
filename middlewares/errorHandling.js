const {
  ValidationError,
  AuthenticationError,
  AccessDeniedError,
  NotFoundError,
  ConflictError,
  InvalidPathError,
} = require("../errors");
const RequestValidationError = require("../errors/request-validation-error");
const SchemaValidationError = require("../errors/schema-validation-error");

const handleErrorResponse = (res, error, statusCode, errorType) => {
  const { message } = error;
  res.status(statusCode).json({
    error: {
      message,
      errorType,
    },
  });
};

const authenticationErrorHandler = (error, req, res, next) => {
  console.log("authenticationErrorHandler");
  if (error instanceof AuthenticationError) {
    return handleErrorResponse(res, error, 401, error.errorType);
  }
  next(error);
};

const notFoundErrorHandler = (error, req, res, next) => {
  console.log("notFoundErrorHandler");
  if (error instanceof NotFoundError) {
    return handleErrorResponse(res, error, 404, error.errorType);
  }
  next(error);
};

const conflictErrorHandler = (error, req, res, next) => {
  console.log("conflictErrorHandler");
  if (error instanceof ConflictError) {
    return handleErrorResponse(res, error, 409, error.errorType);
  }
  next(error);
};

const validationErrorHandler = (error, req, res, next) => {
  console.log("validationErrorHandler");
  if (error instanceof ValidationError) {
    return handleErrorResponse(res, error, 400, error.errorType);
  }
  next(error);
};

const accessDeniedErrorHandler = (error, req, res, next) => {
  console.log("accessDeniedErrorHandler");
  if (error instanceof AccessDeniedError) {
    return handleErrorResponse(res, error, 403, error.errorType);
  }
  next(error);
};

const invalidPathErrorHandler = (error, req, res, next) => {
  console.log("invalidPathErrorHandler");
  if (error instanceof InvalidPathError) {
    return handleErrorResponse(res, error, 404, error.errorType);
  }
  next(error);
};

const schemaValidationErrorHandler = (error, req, res, next) => {
  console.log("schemaValidationErrorHandler");
  if (error instanceof RequestValidationError) {
    return handleErrorResponse(res, error, 400, error.errorType);
  }

  switch (error.name) {
    case "SequelizeValidationError":
      error = schemaErrorHandler(error);
      break;
    case "SequelizeUniqueConstraintError":
      error = duplicateKeyErrorHandler(error);
      break;
    //TODO -> WARN_DATA_TRUNCATED
  }

  handleErrorResponse(res, error, 400, "SCHEMA_VALIDATION_ERROR");
};

const genericErrorHandler = (error, req, res, next) => {
  console.log("genericErrorHandler");
  res.status(500).send({
    error: {
      message: "Something went wrong with the server",
      errorType: "SERVER_ERROR",
    },
  });
  next();
};

const duplicateKeyErrorHandler = (error) => {
  console.log("duplicateKeyErrorHandler");
  const errors = Object.values(error.errors).map((value) => value.message);
  const errorMessages = errors.join(". ");
  return new SchemaValidationError(errorMessages);
};

const schemaErrorHandler = (error) => {
  console.log("schemaErrorHandler");
  const errors = Object.values(error.errors).map((value) => value.message);
  const errorMessages = errors.join(". ");
  const errorMessage = `Invalid input data: ${errorMessages}`;
  return new SchemaValidationError(errorMessage);
};

module.exports = (app) => {
  app.use([
    authenticationErrorHandler,
    conflictErrorHandler,
    validationErrorHandler,
    notFoundErrorHandler,
    accessDeniedErrorHandler,
    invalidPathErrorHandler,
    schemaValidationErrorHandler,
    genericErrorHandler,
  ]);
};
