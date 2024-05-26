const PortfolioShare = require("../models/portfolioShare");

const create = async (portfolioId, shareId, quantity, transaction) => {
  await PortfolioShare.create(
    {
      portfolioId: portfolioId,
      shareId: shareId,
      quantity: quantity,
    },
    { transaction: transaction }
  );
};

const updateShareQuantity = async (
  portfolioId,
  shareId,
  newQuantity,
  transaction
) => {
  await PortfolioShare.update(
    { quantity: newQuantity },
    {
      where: {
        portfolioId: portfolioId,
        shareId: shareId,
      },

      transaction,
    }
  );
};

module.exports = { create, updateShareQuantity };
