const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { User } = db;

class UserService {
  async addUser(userInputs, next) {
    const { firstName, lastName, email } = userInputs;
    const newUser = await User.create({
      [FIRST_NAME]: firstName,
      [LAST_NAME]: lastName,
      [EMAIL]: email,
    });
    return newUser;
  }

  async fetchAllUsers({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
  }) {
    return getPaginatedResult({
      Model: User,
      filter,
      filterFields,
      include,
      search,
      page,
      pageSize,
    });
  }

  async fetchUserById(userId) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}

module.exports = { UserService };
