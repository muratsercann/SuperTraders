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

const deleteShares = async (portfolioId, shareId, transaction) => {
  const shareInPortfolio = await PortfolioShare.findOne({
    where: { portfolioId: portfolioId, shareId: shareId },
    transaction,
  });
  if (shareInPortfolio) {
    await shareInPortfolio.destroy();
  }
};

module.exports = { create, updateShareQuantity, deleteShares };
