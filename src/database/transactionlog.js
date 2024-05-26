const Transactionlog = require("../models/transactionlog");

const create = async (
  userAggregate,
  share,
  quantity,
  transactionType,
  transaction
) => {
  const totalPrice = share.currentPrice * quantity;
  await Transactionlog.create(
    {
      userId: userAggregate.id,
      portfolioId: userAggregate.Portfolio.id,
      shareId: share.id,
      quantity: quantity,
      pricePerShare: share.currentPrice,
      totalPrice: totalPrice,
      transactionType: transactionType,
      beforeLimit: userAggregate.Portfolio.limit,
      afterLimit: userAggregate.Portfolio.limit - totalPrice,
    },
    { transaction: transaction }
  );
};

module.exports = { create };
