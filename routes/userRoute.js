const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user");
const {
  createUserValidations,
  getAllUsersValidations,
  getUserByIdValidations,
  loginValidations,
} = require("../validations/userValidations.js");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { decryptRequestBody } = require("../middlewares/decryptRequestBody");

const userRoute = express.Router();

userRoute.post("/register", [decryptRequestBody], registerUser);
userRoute.post("/login", [decryptRequestBody, ...loginValidations], loginUser);
userRoute.post("/create", [...createUserValidations], createUser);
userRoute.post(
  "/all",
  [decryptRequestBody, isAuthenticated, ...getAllUsersValidations],
  getAllUsers
);
userRoute.post("", [...getUserByIdValidations], [isAuthenticated], getUserById);
userRoute.post("/logout", [isAuthenticated], logoutUser);

module.exports = { userRoute };
