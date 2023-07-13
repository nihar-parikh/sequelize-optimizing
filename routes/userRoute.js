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
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const userRoute = express.Router();

userRoute.post("/register", [], registerUser);
userRoute.post("/login", [], loginUser);
userRoute.post("/create", [...createUserValidations], createUser);
userRoute.post(
  "/all",
  [isAuthenticated],
  [...getAllUsersValidations],
  getAllUsers
);
userRoute.post("", [...getUserByIdValidations], [isAuthenticated], getUserById);
userRoute.post("/logout", [isAuthenticated], logoutUser);

module.exports = { userRoute };
