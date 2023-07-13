// const crypto = require("crypto");
// const dotenv = require("dotenv");
// dotenv.config({ path: ".env" });

// const encryptionAlgorithm = "aes-256-cbc";

// const generateEncryptionKey = () => {
//   const key = crypto.randomBytes(32);
//   return key.toString("hex");
// };

// const generateInitializationVector = () => {
//   const iv = crypto.randomBytes(16);
//   return iv.toString("hex");
// };

// const getKeyAndIVFromEnvironment = () => {
//   const encryptionKey = process.env.ENCRYPTION_KEY;
//   const initializationVector = process.env.INITIALIZATION_VECTOR;
//   console.log({
//     encryptionKey,
//     initializationVector,
//   });
//   if (!encryptionKey || !initializationVector) {
//     throw new Error(
//       "Encryption key or initialization vector not found in environment variables."
//     );
//   }

//   const key = Buffer.from(encryptionKey, "hex");
//   const iv = Buffer.from(initializationVector, "hex");

//   return { key, iv };
// };

// // Function to encrypt the response data
// const encryptData = (data) => {
//   const { key, iv } = getKeyAndIVFromEnvironment();
//   console.log({ key, iv });

//   const cipher = crypto.createCipheriv(encryptionAlgorithm, key, iv);
//   console.log({ cipher });
//   let encryptedData = cipher.update(JSON.stringify(data), "utf8", "hex");
//   encryptedData += cipher.final("hex");
//   console.log({ encryptedData });
//   return encryptedData;
// };

// // Function to decrypt the request body payload
// const decryptData = (encryptedData) => {
//   const { key, iv } = getKeyAndIVFromEnvironment();

//   const decipher = crypto.createDecipheriv(encryptionAlgorithm, key, iv);
//   let decryptedData = decipher.update(encryptedData, "hex", "utf8");
//   decryptedData += decipher.final("utf8");
//   return JSON.parse(decryptedData);
// };

// module.exports = {
//   generateEncryptionKey,
//   generateInitializationVector,
//   encryptData,
//   decryptData,
// };

const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Function to encrypt the response data
const encryptData = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(JSON.stringify(data), "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

// Function to decrypt the request body payload
const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return JSON.parse(decryptedData);
};

module.exports = { encryptData, decryptData };
