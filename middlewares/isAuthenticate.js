const { AuthenticationError } = require("../errors");
const { getUserTokenById } = require("../services/userTokenService");
const { createJwtToken } = require("../utils/createJWTToken");
const { verifyJwtToken } = require("../utils/verifyJwtToken");

exports.isAuthenticate = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  //   console.log({ accessToken, refreshToken });
  if (!refreshToken) {
    // throw new NotAuthorize("Not Authorized to access the page!");
    throw new AuthenticationError();
  }

  try {
    if (accessToken) {
      const payload = verifyJwtToken(accessToken);
      req.userInfo = payload;
      next();
      return;
    }
    console.log("krishna");
    const data = verifyJwtToken(refreshToken);
    console.log({ data });
    const { id, name, email, refreshToken } = data;
    const token = await getUserTokenById(id);
    console.log({ token });
    if (!token) {
      //   throw new NotAuthorize("Not Authorized to access the page!");
      throw new AuthenticationError();
    }

    createJwtToken(res, { id, name, email }, refreshToken);
    req.userInfo = { id, name, email };
    next();
  } catch (error) {
    // throw new NotAuthorize("Not Authorized");
    throw new AuthenticationError();
  }
};
