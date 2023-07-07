const { USER_MODEL_KEYWORDS } = require("../shared/modelKeywords");
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, SALT } = USER_MODEL_KEYWORDS;
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
const { User, Image, Video, Comment, Tag, UserToken } = db;

class UserService {
  async signUpUser(userInputs) {
    const { firstName, lastName, email, password } = userInputs;

    // create salt
    const salt = await generateSalt();

    const hashedPassword = await generatePassword(password, salt);

    const newUser = await User.create({
      [FIRST_NAME]: firstName,
      [LAST_NAME]: lastName,
      [EMAIL]: email,
      [PASSWORD]: hashedPassword,
      [SALT]: salt,
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

  // async setToken(user, res) {
  //   console.log("setToken");

  //   const refreshToken = await getUserTokenById(user.id);

  //   if (refreshToken) {
  //     console.log("refreshToken");
  //     createJwtToken(res, user, refreshToken.refreshToken);
  //   } else {
  //     const refreshToken = generateRefreshToken();
  //     console.log("else refreshToken");
  //     await createToken({ userId: user.id, refreshToken });
  //     createJwtToken(res, user, refreshToken);
  //   }
  // }

  // async getUserTokenById(id) {
  //   console.log("getUserTokenById");
  //   try {
  //     const token = await UserToken.findOne({ userId: id });
  //     return token;
  //   } catch (error) {
  //     throw new Error("Failed to retrieve user token");
  //   }
  // }

  // async createToken(payload) {
  //   try {
  //     const token = await UserToken.create(payload);
  //     if (!token) {
  //       throw new Error("Failed to create user token");
  //     }
  //   } catch (error) {
  //     throw new Error("Failed to create user token");
  //   }
  // }

  async fetchUserByEmail({ email }) {
    const user = await User.findOne({
      where: {
        email,
      },
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
