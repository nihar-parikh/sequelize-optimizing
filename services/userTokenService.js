const {
  createJwtToken,
  generateRefreshToken,
} = require("../utils/createJWTToken");
const db = require("../models");
const { UserToken } = db;

const setToken = async (user, res) => {
  const refreshToken = await getUserTokenById(user.id);

  if (refreshToken) {
    createJwtToken(res, user, refreshToken.refreshToken);
  } else {
    const refreshToken = generateRefreshToken();
    await createToken({ userId: user.id, refreshToken });
    createJwtToken(res, user, refreshToken);
  }
};

const getUserTokenById = async (id) => {
  try {
    const token = await UserToken.findOne({ where: { userId: id } });
    return token;
  } catch (error) {
    throw new Error("Failed to retrieve user token");
  }
};

const createToken = async (payload) => {
  try {
    const token = await UserToken.create(payload);
    if (!token) {
      throw new Error("Failed to create user token");
    }
  } catch (error) {
    throw new Error("Failed to create user token");
  }
};

module.exports = {
  setToken,
  getUserTokenById,
};
