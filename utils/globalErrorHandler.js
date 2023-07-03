const { CustomError } = require("./CustomError");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const developmentErrors = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (error) => {
  const errorMessage = `Invalid value ${error.value} for field ${error.path}`;
  return new CustomError(errorMessage, 400);
};

const duplicateKeyErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((value) => value.message);
  const errorMessages = errors.join(". ");
  return new CustomError(errorMessages, 400);
};

const validationErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((value) => value.message);
  const errorMessages = errors.join(". ");
  const errorMessage = `Invalid input data: ${errorMessages}`;
  return new CustomError(errorMessage, 400);
};

const productionErrors = (error, res) => {
  //on production we only show operational errors
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    //for non operational errors
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try later",
    });
  }
};

exports.globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  switch (error.name) {
    case "SequelizeValidationError":
      error = validationErrorHandler(error);
      break;
    case "SequelizeUniqueConstraintError":
      error = duplicateKeyErrorHandler(error);
      break;
  }
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    developmentErrors(error, res);
  } else if (process.env.NODE_ENV === "production") {
    productionErrors(error, res);
  }
};
