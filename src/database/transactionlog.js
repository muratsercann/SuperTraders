const Transactionlog = require("../models/transactionlog");

const create = async (User, share, quantity, transactionType, transaction) => {
  
  const totalPrice = share.currentPrice * quantity;
  const afterLimit =
    transactionType === "buy"
      ? User.Portfolio.limit - totalPrice
      : User.Portfolio.limit + totalPrice;

  await Transactionlog.create(
    {
      userId: User.id,
      portfolioId: User.Portfolio.id,
      shareId: share.id,
      quantity: quantity,
      pricePerShare: share.currentPrice,
      totalPrice: totalPrice,
      transactionType: transactionType,
      beforeLimit: User.Portfolio.limit,
      afterLimit: afterLimit,
    },
    { transaction: transaction }
  );
};

module.exports = { create };
