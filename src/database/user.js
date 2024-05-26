const User = require("../models/user");
const Share = require("../models/share");
const Portfolio = require("../models/portfolio");
const PortfolioShare = require("../models/portfolioShare");


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


module.exports = {
  getUserWithAssociatedData,
};
