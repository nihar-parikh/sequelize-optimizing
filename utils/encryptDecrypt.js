const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// Function to encrypt the response data
const encryptData = (data, key, iv) => {
  console.log({ algorithm, key, iv });
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(JSON.stringify(data), "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

// Function to decrypt the request body payload
const decryptData = (encryptedData, key, iv) => {
  console.log({ algorithm, key, iv });
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return JSON.parse(decryptedData);
};

module.exports = { encryptData, decryptData };
