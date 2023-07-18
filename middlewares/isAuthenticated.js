const { key, iv } = require("../config/encryptionConfig");
const { AuthenticationError } = require("../errors");
const { getUserRefreshTokenById } = require("../services/userTokenService");
const { asyncWrapper } = require("../utils/asyncWrapper");
const { createJwtToken } = require("../utils/createJWTToken");
const { decryptData } = require("../utils/encryptDecrypt");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

exports.isAuthenticated = asyncWrapper(async (req, res, next) => {
  console.log(req.signedCookies);
  // const accessToken = decryptData(req.signedCookies.accessToken, key, iv);
  // const refreshToken = decryptData(req.signedCookies.refreshToken, key, iv);
  const { accessToken, refreshToken } = req.signedCookies;
  console.log({ accessToken, refreshToken });

  if (!refreshToken) {
    throw new AuthenticationError();
  }

  let payload;

  if (accessToken) {
    payload = verifyJwtToken(accessToken);
  } else {
    const data = verifyJwtToken(refreshToken);
    const { id, firstName, lastName, email, role } = data;
    const token = await getUserRefreshTokenById(id);

    if (!token) {
      throw new AuthenticationError();
    }

    createJwtToken(
      res,
      { id, firstName, lastName, email, role },
      data.refreshToken
    );
    payload = { id, firstName, lastName, email, role };
  }

  req.userInfo = payload;
  next();
});
