const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { EMAIL, PASSWORD } = USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");

const userService = new UserService();

exports.loginUser = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  const { [EMAIL]: email, [PASSWORD]: password } = req.body;

  let existingUser = await userService.fetchUserByEmail({
    email,
  });

  if (existingUser) {
    const isMatchedPassword = await userService.matchPassword({
      enteredPassword: password,
      savedPassword: existingUser.password,
      savedSalt: existingUser.salt,
    });
    if (isMatchedPassword) {
      await userService.signInUser(existingUser, res);
      return res.status(200).json({
        status: "success",
        data: existingUser,
      });
    }
  }
});
