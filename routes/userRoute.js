const express = require("express");
const { createUser } = require("../controllers/userController.js");

const userRoute = express.Router();

userRoute.post("/create", createUser);

module.exports = { userRoute };
