const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL } = USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");

const userService = new UserService();

exports.createUser = asyncWrapper(async (req, res, next) => {
  const {
    [FIRST_NAME]: firstName,
    [LAST_NAME]: lastName,
    [EMAIL]: email,
  } = req.body;

  const newUser = await userService.addUser(
    { firstName, lastName, email },
    next
  );
  if (newUser) {
    return res.status(200).json({
      status: "success",
      data: newUser,
    });
  }
});
