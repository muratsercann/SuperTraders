const Portfolio = require("../models/portfolio");

const getUserPortfolio = async (userId) => {
  return await Portfolio.findOne({
    where: { 
        id: userId
    },
  });
};

module.exports = { getAllUsers, getUserById };
