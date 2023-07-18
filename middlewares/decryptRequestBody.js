const { decryptData } = require("../utils/encryptDecrypt");
const { key, iv } = require("../config/encryptionConfig");

const decryptRequestBody = (req, res, next) => {
  const { encryptedPayload } = req.body;
  const decryptedPayload = decryptData(encryptedPayload, key, iv);
  req.body = decryptedPayload; // Attach the decrypted payload to the request body
  next();
};

module.exports = { decryptRequestBody };
