const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, SALT, ROLE_ID } =
  USER_MODEL_KEYWORDS;
const db = require("../models");
const { getPaginatedResult } = require("../utils/getPaginatedResult");
const { NotFoundError } = require("../errors");
const { generateSalt, generatePassword } = require("../utils/generatePassword");
const { validatePassword } = require("../utils/validatePassword");
const {
  createJwtToken,
  generateRefreshToken,
} = require("../utils/createJWTToken");
const { setToken } = require("./userTokenService");
const { User, Image, Video, Comment, Tag, UserToken, Role } = db;

class UserService {
  async signUpUser(userInputs) {
    const { firstName, lastName, email, password, roleId } = userInputs;

    // create salt
    const salt = await generateSalt();

    const hashedPassword = await generatePassword(password, salt);

    let newUser = await User.create({
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

  // async assignRole(userId, roleId, transaction) {
  //   const user = await User.findByPk(userId, { transaction });
  //   if (!user) {
  //     throw new NotFoundError(`User with ID ${userId} not found.`);
  //   }

  //   const role = await Role.findByPk(roleId, { transaction });
  //   if (!role) {
  //     throw new NotFoundError(`Role with ID ${roleId} not found.`);
  //   }

  //   user.roleId = roleId;
  //   await user.save();

  //   return true;
  // }

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
        },
      ],
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
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
    include = [
      {
        model: Image,
        as: "images",
        include: [
          {
            model: Comment,
            as: "comments",
          },
          {
            model: Tag,
            as: "tags",
          },
        ],
      },
      {
        model: Video,
        as: "videos",
        include: [
          {
            model: Comment,
            as: "comments",
          },
          {
            model: Tag,
            as: "tags",
          },
        ],
      },
    ];
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
      include: [
        {
          model: Role,
          as: "role",
        },
        {
          model: Image,
          as: "images",
          include: [
            {
              model: Comment,
              as: "comments",
            },
            {
              model: Tag,
              as: "tags",
            },
          ],
        },
        {
          model: Video,
          as: "videos",
          include: [
            {
              model: Comment,
              as: "comments",
            },
            {
              model: Tag,
              as: "tags",
            },
          ],
        },
      ],
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}

module.exports = { UserService };
