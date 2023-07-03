const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { USER_ID } = USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");

const userService = new UserService();

exports.getUserById = asyncWrapper(async (req, res, next) => {
  const { [USER_ID]: userId } = req.params;

  const user = await userService.fetchUserById(userId, next);
  if (user) {
    return res.status(200).json({
      status: "success",
      data: user,
    });
  }
});
