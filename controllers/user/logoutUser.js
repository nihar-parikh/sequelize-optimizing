const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler.js");
const UserTokenService = require("../../services/userTokenService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");

exports.logoutUser = asyncWrapper(async (req, res, next) => {
  requestValidationHandler(req);

  const { id } = req.userInfo;

  const isUserTokenDeleted = await UserTokenService.deleteToken(id);

  //isUserTokenDeleted returns 1 or 0
  //to convert 1,0 into boolean then add !! -> !!1 = true
  if (!!isUserTokenDeleted) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({
      status: "success",
      message: "Logged out successfully.",
    });
  }
});
