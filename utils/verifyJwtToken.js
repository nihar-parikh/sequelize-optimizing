const jwt = require("jsonwebtoken");

exports.verifyJwtToken = (token) => jwt.verify(token, "krishna512");
