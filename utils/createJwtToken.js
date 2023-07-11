const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

exports.createJwtToken = (res, user, refresh_token) => {
  const accessToken = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(
    { ...user, refreshToken: refresh_token },
    process.env.JWT_TOKEN_SECRET,
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
  };

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

exports.generateRefreshToken = () => crypto.randomBytes(40).toString("hex");
