const express = require("express");
const { createUser, getAllUsers, getUserById } = require("../controllers/user");
const {
  createUserValidations,
  getAllUsersValidations,
  getUserByIdValidations,
} = require("../validations/userValidations.js");

const userRoute = express.Router();

userRoute.post("/create", [...createUserValidations], createUser);
userRoute.post("/all", [...getAllUsersValidations], getAllUsers);
userRoute.post("", [...getUserByIdValidations], getUserById);

module.exports = { userRoute };
