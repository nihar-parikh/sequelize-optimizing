const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
const { encryptData } = require("./encryptDecrypt");
const { key, iv } = require("../config/encryptionConfig");
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

  const encryptedAccessToken = encryptData(accessToken, key, iv);
  const encryptedRefreshToken = encryptData(refreshToken, key, iv);

  console.log({ encryptedAccessToken, encryptedRefreshToken });

  res.cookie("accessToken", encryptedAccessToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie("refreshToken", encryptedRefreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

exports.generateRefreshToken = () => crypto.randomBytes(40).toString("hex");
