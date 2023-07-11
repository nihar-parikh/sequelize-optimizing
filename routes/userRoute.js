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
} = require("../validations/userValidations.js");
const { isAuthenticate } = require("../middlewares/isAuthenticate");

const userRoute = express.Router();

userRoute.post("/register", [], registerUser);
userRoute.post("/login", [], loginUser);
userRoute.post("/create", [...createUserValidations], createUser);
userRoute.post(
  "/all",
  [isAuthenticate],
  [...getAllUsersValidations],
  getAllUsers
);
userRoute.post("", [...getUserByIdValidations], getUserById);
userRoute.post("/logout", [isAuthenticate], logoutUser);

module.exports = { userRoute };
