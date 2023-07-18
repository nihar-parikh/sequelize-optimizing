const { decryptData } = require("../utils/encryptDecrypt");
const { key, iv } = require("../config/encryptionConfig");

const decryptRequestBody = (req, res, next) => {
  const { encryptedPayload } = req.body;
  const decryptedPayload = decryptData(encryptedPayload, key, iv);
  req.body = decryptedPayload; // Attach the decrypted payload to the request body
  console.log(req.body);

  if (Object.keys(req.signedCookies).length !== 0) {
    console.log(req.signedCookies);
    const decryptedAccessToken = decryptData(
      req.signedCookies.accessToken,
      key,
      iv
    );
    const decryptedRefreshToken = decryptData(
      req.signedCookies.refreshToken,
      key,
      iv
    );
    req.signedCookies = {
      accessToken: decryptedAccessToken,
      refreshToken: decryptedRefreshToken,
    };
  }

  next();
};

module.exports = { decryptRequestBody };
