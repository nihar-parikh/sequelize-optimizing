const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

exports.verifyJwtToken = (token) =>
  jwt.verify(token, process.env.JWT_TOKEN_SECRET);
