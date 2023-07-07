const { generatePassword } = require("./generatePassword");

exports.validatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};
