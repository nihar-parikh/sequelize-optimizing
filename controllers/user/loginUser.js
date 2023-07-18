const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { EMAIL, PASSWORD } = USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { NotFoundError, AccessDeniedError } = require("../../errors");
const { encryptedResponse } = require("../../utils/encryptedResponse");
const { key, iv } = require("../../config/encryptionConfig");

const userService = new UserService();

exports.loginUser = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req.body);

  const { [EMAIL]: email, [PASSWORD]: password } = req.body;

  const existingUser = await userService.fetchUserByEmail({
    email,
  });

  if (!existingUser) {
    throw new NotFoundError("Invalid credentials", "INVALID_CREDENTIALS");
  }

  const isMatchedPassword = await userService.matchPassword({
    enteredPassword: password,
    savedPassword: existingUser.password,
    savedSalt: existingUser.salt,
  });

  if (!isMatchedPassword) {
    throw new AccessDeniedError("Invalid credentials", "INVALID_CREDENTIALS");
  }

  await userService.signInUser(existingUser, res);

  return encryptedResponse({
    res,
    statusCode: 200,
    data: existingUser,
    key,
    iv,
  });
});
