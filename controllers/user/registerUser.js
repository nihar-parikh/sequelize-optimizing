const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");

const userService = new UserService();

exports.registerUser = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  const {
    [FIRST_NAME]: firstName,
    [LAST_NAME]: lastName,
    [EMAIL]: email,
    [PASSWORD]: password,
  } = req.body;

  const newUser = await userService.signUpUser({
    firstName,
    lastName,
    email,
    password,
  });
  if (newUser) {
    return res.status(200).json({
      status: "success",
      data: newUser,
    });
  }
});
