const Portfolio = require("../models/portfolio");

const getUserPortfolio = async (userId) => {
  return await Portfolio.findOne({
    where: { 
        id: userId
    },
  });
};

const updateLimit = async (portfolioId, newLimit, transaction) => {
  const queryOptions = { where: { id: portfolioId } };
  
  if (transaction) {
    queryOptions.transaction = transaction;
  }

  await Portfolio.update({ limit: newLimit }, queryOptions);
}

module.exports = { getUserPortfolio, updateLimit};
