const { USER_REQUEST_KEYWORDS } = require("../requestKeywords/index.js");
const { FIRST_NAME, LAST_NAME, EMAIL } = USER_REQUEST_KEYWORDS;
const { UserService } = require("../services/userService.js");

const userService = new UserService();

exports.createUser = async (req, res, next) => {
  try {
    const {
      [FIRST_NAME]: firstName,
      [LAST_NAME]: lastName,
      [EMAIL]: email,
    } = req.body;
    const newUser = await userService.addUser({ firstName, lastName, email });
    return res.status(200).json(newUser);
  } catch (err) {
    console.log({ err });
    next(err);
  }
};
