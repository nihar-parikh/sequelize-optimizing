const CryptoJS = require("crypto-js");

const key = "3bcae157761da035cd0b4df7308c0c40538e7db962ed328af69788991e5f20c2";
// CryptoJS.lib.WordArray.random(256 / 8).toString();
const iv = "adb69310df0876a0b51174a11454478b";
// CryptoJS.lib.WordArray.random(128 / 8).toString();
console.log({ key, iv });

module.exports = { key, iv };
