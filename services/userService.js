const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, SALT, ROLE_ID } =
  USER_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError, AccessDeniedError } = require("../errors");
const { generateSalt, generatePassword } = require("../utils/generatePassword");
const { validatePassword } = require("../utils/validatePassword");
const {
  createJwtToken,
  generateRefreshToken,
} = require("../utils/createJWTToken");
const { setToken } = require("./userTokenService");
const { User, Image, Video, Comment, Tag, UserToken, Role, Permission } = db;

class UserService {
  async signUpUser(userInputs) {
    const { firstName, lastName, email, password, roleId } = userInputs;

    // create salt
    const salt = await generateSalt();

    const hashedPassword = await generatePassword(password, salt);

    const newUser = await User.create({
      [FIRST_NAME]: firstName,
      [LAST_NAME]: lastName,
      [EMAIL]: email,
      [PASSWORD]: hashedPassword,
      [SALT]: salt,
      [ROLE_ID]: roleId,
    });

    return newUser;
  }

  async matchPassword({ enteredPassword, savedPassword, savedSalt }) {
    const isValidPassword = await validatePassword(
      enteredPassword,
      savedPassword,
      savedSalt
    );
    return isValidPassword;
  }

  async signInUser(existingUser, res) {
    // Generate tokens and set cookies
    await setToken(existingUser, res);
  }

  async fetchUserByEmail({ email }) {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Role,
          as: "role",
          required: true,
          attributes: ["id", "roleName"],
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["id", "permissionName", "action"],
              through: { attributes: [] }, // Exclude the join table attributes
            },
          ],
        },
      ],
    });

    return user;
  }

  async addUser(userInputs) {
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
    include = getUserIncludeOptions();
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
      include: getUserIncludeOptions(),
    });
    return user;
  }
}

const getUserIncludeOptions = () => {
  return [
    {
      model: Role,
      as: "role",
      attributes: ["id", "roleName"],
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "permissionName", "action"],
          through: { attributes: [] }, // Exclude the join table attributes
        },
      ],
    },
    {
      model: Image,
      as: "images",
      attributes: ["id", "title", "url"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "title"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    },
    {
      model: Video,
      as: "videos",
      attributes: ["id", "title", "url"],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "title"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    },
  ];
};

module.exports = { UserService };
