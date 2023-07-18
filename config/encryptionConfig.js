const CryptoJS = require("crypto-js");

const key = CryptoJS.lib.WordArray.random(256 / 8).toString();
const iv = CryptoJS.lib.WordArray.random(128 / 8).toString();
console.log({ key, iv });

module.exports = { key, iv };
