// const logger = require('../utils/logger.js')
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

// function errorLogger (err, req, res, next) {
//   if (process.env.NODE_ENV !== 'production') {
//     logger.error(err.stack)
//   }
//   logger.error(err.message)
//   next(err)
// }

function authenticationErrorHandler(err, req, res, next) {
  console.log("authenticationErrorHandler");
  if (err instanceof AuthenticationError) {
    return res.status(401).send({
      error: {
        message: err.message,
        errorType: err.errorType,
      },
    });
  }
  next(err);
}

function notFoundErrorHandler(err, req, res, next) {
  console.log("notFoundErrorHandler");
  if (err instanceof NotFoundError) {
    return res.status(404).send({
      error: {
        message: err.message,
        errorType: err.errorType,
      },
    });
  }
  next(err);
}
function conflictErrorHandler(err, req, res, next) {
  console.log("conflictErrorHandler");
  if (err instanceof ConflictError) {
    return res.status(409).send({
      error: {
        message: err.message,
        errorType: err.errorType,
      },
    });
  }
  next(err);
}

function validationErrorHandler(err, req, res, next) {
  console.log("validationErrorHandler");
  if (err instanceof ValidationError) {
    return res.status(400).send({
      error: {
        message: err.message,
        errorType: err.errorType,
      },
    });
  }
  next(err);
}

function accessDeniedErrorHandler(err, req, res, next) {
  console.log("accessDeniedErrorHandler");
  if (err instanceof AccessDeniedError) {
    return res.status(403).send({
      error: {
        message: err.message,
        errorType: err.errorType,
      },
    });
  }
  next(err);
}

function invalidPathErrorHandler(err, req, res, next) {
  console.log("invalidPathErrorHandler");
  if (err instanceof InvalidPathError) {
    return res.status(404).send({
      error: {
        message: err.message,
        errorType: err.errorType,
      },
    });
  }
  next(err);
}

function schemaValidationErrorHandler(err, req, res, next) {
  console.log("sequelizeValidationErrorHandler");

  if (err instanceof RequestValidationError) {
    return res.status(400).json({
      error: {
        message: err.message,
        errorType: err.errorType,
      },
    });
  }

  switch (err.name) {
    case "SequelizeValidationError":
      err = schemaErrorHandler(err);
      break;
    case "SequelizeUniqueConstraintError":
      err = duplicateKeyErrorHandler(err);
      break;
  }

  res.status(400).json({
    error: {
      message: err.message,
      errorType: "SCHEMA_VALIDATION_ERROR",
    },
  });
  next();
}

function genericErrorHandler(err, req, res, next) {
  console.log("genericErrorHandler");
  res.status(500).send({
    error: {
      message: "Something went wrong with a server",
      errorType: "SERVER_ERROR",
    },
  });
  next();
}

const duplicateKeyErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((value) => value.message);
  const errorMessages = errors.join(". ");
  return new SchemaValidationError(errorMessages);
};

const schemaErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((value) => value.message);
  const errorMessages = errors.join(". ");
  const errorMessage = `Invalid input data: ${errorMessages}`;
  return new SchemaValidationError(errorMessage);
};

module.exports = function ErrorHandlingMiddleware(app) {
  app.use([
    // errorLogger,
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
