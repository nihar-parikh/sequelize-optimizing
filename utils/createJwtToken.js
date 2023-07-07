const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.createJwtToken = (res, user, refresh_token) => {
  const accessToken = jwt.sign(user.toJSON(), "krishna512", {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(
    { ...user.toJSON(), refresh_token },
    "krishna512",
    {
      expiresIn: "7d",
    }
  );

  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: false,
    signed: true,
    sameSite: "lax",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  };

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 1000 * 60,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 2,
  });
};

exports.generateRefreshToken = () => crypto.randomBytes(40).toString("hex");
