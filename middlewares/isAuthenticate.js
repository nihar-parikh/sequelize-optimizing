const { AuthenticationError } = require("../errors");
const { getUserRefreshTokenById } = require("../services/userTokenService");
const { asyncWrapper } = require("../utils/asyncWrapper");
const { createJwtToken } = require("../utils/createJWTToken");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

exports.isAuthenticate = asyncWrapper(async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  if (!refreshToken) {
    throw new AuthenticationError();
  }

  let payload;

  if (accessToken) {
    payload = verifyJwtToken(accessToken);
  } else {
    const data = verifyJwtToken(refreshToken);
    const { id, firstName, lastName, email } = data;
    const token = await getUserRefreshTokenById(id);

    if (!token) {
      throw new AuthenticationError();
    }

    createJwtToken(res, { id, firstName, lastName, email }, data.refreshToken);
    payload = { id, firstName, lastName, email };
  }

  req.userInfo = payload;
  next();
});
