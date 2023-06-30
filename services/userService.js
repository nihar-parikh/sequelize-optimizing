const { USER_MODEL_KEYWORDS } = require("../modelKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;
const db = require("../models");
const { User } = db;

class UserService {
  async addUser(userInputs) {
    const { firstName, lastName, email } = userInputs;
    try {
      const newUser = await User.create({
        [FIRST_NAME]: firstName,
        [LAST_NAME]: lastName,
        [EMAIL]: email,
      });
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { UserService };
