const {
  createJwtToken,
  generateRefreshToken,
} = require("../utils/createJWTToken");
const db = require("../models");
const { NotFoundError } = require("../errors");
const { UserToken, sequelize } = db;

const setToken = async (user, res) => {
  const refreshToken = await getUserRefreshTokenById(user.id);

  if (!refreshToken) {
    const newRefreshToken = generateRefreshToken();
    await sequelize.transaction(async (transaction) => {
      await saveTokenToDB(
        { userId: user.id, refreshToken: newRefreshToken },
        transaction
      );
      createJwtToken(res, user.toJSON(), newRefreshToken);
    });
  } else {
    createJwtToken(res, user.toJSON(), refreshToken.refreshToken);
  }
};

const getUserRefreshTokenById = async (id) => {
  const token = await UserToken.findOne({ where: { userId: id } });
  if (!token) {
    throw new NotFoundError("Token not found");
  }
  return token;
};

const saveTokenToDB = async (payload, transaction) => {
  const token = await UserToken.create(payload, { transaction });
};

const deleteToken = async (userId) => {
  const token = UserToken.destroy({
    where: {
      userId,
    },
  });
  return token;
};

module.exports = {
  setToken,
  getUserRefreshTokenById,
  deleteToken,
};
