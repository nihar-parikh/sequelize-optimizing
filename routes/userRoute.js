const express = require("express");
const { createUser } = require("../controllers/user/createUser.js");
const { getAllUsers } = require("../controllers/user/getAllUsers.js");
const { getUserById } = require("../controllers/user/getUserById.js");
const { createUserValidations } = require("../validations/userValidations.js");

const userRoute = express.Router();

userRoute.post("/create", [...createUserValidations], createUser);
userRoute.get("/all", getAllUsers);
userRoute.get("/:userId", getUserById);

module.exports = { userRoute };
