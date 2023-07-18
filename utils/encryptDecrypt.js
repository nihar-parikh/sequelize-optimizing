const CryptoJS = require("crypto-js");

const encryptData = (data, key, iv) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Hex.parse(key),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
    }
  ).toString();
  return encryptedData;
};

const decryptData = (encryptedData, key, iv) => {
  const decryptedData = CryptoJS.AES.decrypt(
    encryptedData,
    CryptoJS.enc.Hex.parse(key),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
    }
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

module.exports = { encryptData, decryptData };
