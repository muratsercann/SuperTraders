const User = require("../models/user");
const Share = require("../models/share");
const Portfolio = require("../models/portfolio");
const PortfolioShare = require("../models/portfolioShare");

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (userId) => {
  return await User.findByPk(userId);
};

const getUserWithAssociatedData = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
    include: {
      model: Portfolio,
      attributes: ["id", "userId", "limit"],
      include: {
        model: PortfolioShare,
        attributes: ["id", "portfolioId", "shareId", "quantity"],
        include: {
          model: Share,
          attributes: ["id", "symbol", "currentPrice", "quantity"],
        },
      },
    },
  });
  return user;
};

const isExistingUser = async (userId) => {
  const user = await User.findByPk(userId);
  return user ? true : false;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserWithAssociatedData,
  isExistingUser,
};
