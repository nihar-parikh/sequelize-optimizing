const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL } = USER_MODEL_KEYWORDS;
const db = require("../models");
const { CustomError } = require("../utils/CustomError");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { User } = db;

class UserService {
  async addUser(userInputs, next) {
    const { firstName, lastName, email } = userInputs;
    try {
      const newUser = await User.create({
        [FIRST_NAME]: firstName,
        [LAST_NAME]: lastName,
        [EMAIL]: email,
      });
      return newUser;
    } catch (error) {
      // console.log({ error });
      next(error);
    }
  }

  async fetchAllUsers({
    page,
    pageSize,
    include,
    filter,
    filterFields,
    search,
    next,
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

  async fetchUserById(userId, next) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        const error = new CustomError(`User with that ID is not found`, 404);
        //always return
        return next(error);
      }
      return user;
    } catch (error) {
      console.log({ error });
      return next(error);
    }
  }
}

module.exports = { UserService };
