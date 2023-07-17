// const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
// const { EMAIL, PASSWORD } = USER_REQUEST_KEYWORDS;
// const { UserService } = require("../../services/userService.js");
// const { asyncWrapper } = require("../../utils/asyncWrapper");
// const {
//   requestValidationHandler,
// } = require("../../middlewares/requestValidationHandler");
// const { NotFoundError, AccessDeniedError } = require("../../errors");
// const { encryptData } = require("../../utils/encryptDecrypt");
// const { decryptData } = require("../../utils/encryptDecrypt");

// const userService = new UserService();

// exports.loginUser = asyncWrapper(async (req, res, next) => {
//   requestValidationHandler(req);

//   console.log(
//     decryptData(
//       "e8a7ea70764f8ef7558060a76c0acefd3ddb986f336e2c04fbd998212a41caf657b28ac57f3813d8220a467ebf70a2a4eaa3abc6568dbd476e367c28fc48cb0a"
//     )
//   );

//   const { [EMAIL]: email, [PASSWORD]: password } = req.body;

//   const existingUser = await userService.fetchUserByEmail({
//     email,
//   });

//   if (!existingUser) {
//     throw new NotFoundError("Invalid credentials", "INVALID_CREDENTIALS");
//   }

//   const isMatchedPassword = await userService.matchPassword({
//     enteredPassword: password,
//     savedPassword: existingUser.password,
//     savedSalt: existingUser.salt,
//   });

//   if (!isMatchedPassword) {
//     throw new AccessDeniedError("Invalid credentials", "INVALID_CREDENTIALS");
//   }

//   await userService.signInUser(existingUser, res);

//   return res.status(200).json(
//     // decryptData(
//     encryptData({
//       status: "success",
//       data: existingUser,
//     })
//     // )
//   );
// });

const { USER_REQUEST_KEYWORDS } = require("../../shared/requestKeywords");
const { EMAIL, PASSWORD } = USER_REQUEST_KEYWORDS;
const { UserService } = require("../../services/userService.js");
const { asyncWrapper } = require("../../utils/asyncWrapper");
const {
  requestValidationHandler,
} = require("../../middlewares/requestValidationHandler");
const { NotFoundError, AccessDeniedError } = require("../../errors");
const { encryptData, decryptData } = require("../../utils/encryptDecrypt");
const crypto = require("crypto");
const { encryptedResponse } = require("../../utils/encryptedResponse");

const userService = new UserService();

// Generate a random key and IV
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
const key = Buffer.from(
  "a35d9e18f7a1f6d19d8571b30f4a9387a14c2f0ef7a145d6a14c2f0ef7a145d6",
  "hex"
);
const iv = Buffer.from("9c7b3f0689c70c0e93af8478a12b3c2a", "hex");

console.log({ key, iv });

exports.loginUser = asyncWrapper(async (req, res, next) => {
  const { encryptedPayload } = req.body;
  const decryptedPayload = decryptData(encryptedPayload, key, iv);
  // const encryptedPayload = encryptData(req.body, key, iv);
  // console.log({ encryptedPayload });
  // const decryptedPayload = decryptData(encryptedPayload, key, iv);

  console.log({ decryptedPayload });

  requestValidationHandler(decryptedPayload);

  const { [EMAIL]: email, [PASSWORD]: password } = decryptedPayload;

  const existingUser = await userService.fetchUserByEmail({
    email,
  });

  if (!existingUser) {
    throw new NotFoundError("Invalid credentials", "INVALID_CREDENTIALS");
  }

  const isMatchedPassword = await userService.matchPassword({
    enteredPassword: password,
    savedPassword: existingUser.password,
    savedSalt: existingUser.salt,
  });

  if (!isMatchedPassword) {
    throw new AccessDeniedError("Invalid credentials", "INVALID_CREDENTIALS");
  }

  await userService.signInUser(existingUser, res);

  return encryptedResponse({ res, statusCode: 200, existingUser, key, iv });
});
