const Transactionlog = require("../models/transactionlog");

const create = async (user, share, quantity, transactionType, transaction) => {
  
  const totalPrice = share.currentPrice * quantity;
  const afterLimit =
    transactionType === "buy"
      ? user.Portfolio.limit - totalPrice
      : user.Portfolio.limit + totalPrice;

  await Transactionlog.create(
    {
      userId: user.id,
      portfolioId: user.Portfolio.id,
      shareId: share.id,
      quantity: quantity,
      pricePerShare: share.currentPrice,
      totalPrice: totalPrice,
      transactionType: transactionType,
      beforeLimit: user.Portfolio.limit,
      afterLimit: afterLimit,
    },
    { transaction: transaction }
  );
};

module.exports = { create };
