const { validationResult } = require("express-validator");
const RequestValidationError = require("../errors/request-validation-error");

exports.requestValidationHandler = (requestPayload) => {
  console.log({ requestPayload });
  const errors = validationResult(requestPayload);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
};
