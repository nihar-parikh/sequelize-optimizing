const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { createUser } = require("./createUser");
const { getAllUsers } = require("./getAllUsers");
const { getUserById } = require("./getUserById");
const { logoutUser } = require("./logoutUser");

module.exports = {
  registerUser,
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  logoutUser,
};
