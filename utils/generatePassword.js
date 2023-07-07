const bcrypt = require("bcrypt");

// Utility functions
exports.generateSalt = async () => {
  const saltRounds = 10;
  return bcrypt.genSalt(saltRounds);
};

exports.generatePassword = async (password, salt) => {
  return bcrypt.hash(password, salt);
};
