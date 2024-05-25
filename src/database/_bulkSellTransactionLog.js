const sequelize = require("./db");
const Share = require("../models/share");
const User = require("../models/user");
const Portfolio = require("../models/portfolio");
const PortfolioShare = require("../models/portfolioShare");
const Transactionlog = require("../models/transactionlog");

start();

async function start() {
  const shares = await Share.findAll({
    order: [["id", "ASC"]],
  });

  const msercan = await User.findOne({ where: { username: "msercan" } });
  const mchanbaz = await User.findOne({ where: { username: "mchanbaz" } });
  const fgurdal = await User.findOne({ where: { username: "fgurdal" } });

  await sell(msercan.id, shares[0].id, 4);
  await sell(msercan.id, shares[0].id, 5);
  await sell(msercan.id, shares[1].id, 4);
  await sell(msercan.id, shares[2].id, 4);

  await sell(mchanbaz.id, shares[0].id, 4);
  await sell(mchanbaz.id, shares[1].id, 2);
  await sell(mchanbaz.id, shares[1].id, 2);
  await sell(mchanbaz.id, shares[2].id, 3);
  await sell(mchanbaz.id, shares[2].id, 1);
  //   await sell(mchanbaz.id, shares[3].id, 2);
}

async function sell(userId, shareId, quantity) {
  try {
    await sequelize.transaction(async (transaction) => {
      const portfolio = await Portfolio.findOne({
        where: { userId: userId },
        transaction,
      });

      //check if the user portfolio exists
      if (!portfolio) {
        throw new Error("The user does not have a portfolio!");
      }

      const shareInPortfolio = await PortfolioShare.findOne({
        where: { portfolioId: portfolio.id, shareId: shareId },
      });

      if (!shareInPortfolio) {
        throw new Error("The user does not have this share in his portfolio!");
      }

      //check if the user portfolio has enough quantity for the share to be sold
      if (shareInPortfolio.quantity < quantity) {
        throw new Error(
          "The quantity of the share in the user portfolio is not enoug!"
        );
      }

      const share = await Share.findOne({
        where: { id: shareId },
        transaction,
      });

      const totalPrice = share.currentPrice * quantity;

      await UpdatePortfolioLimit(portfolio, totalPrice, transaction);

      await RemoveShareFromThePortfolio(
        shareInPortfolio,
        portfolio,
        shareId,
        quantity,
        transaction
      );

      const newShareQuantity = share.quantity + quantity;
      await UpdateShareQuantity(share, newShareQuantity, transaction);

      await CreateTransactionLog(
        portfolio,
        share,
        quantity,
        totalPrice,
        "sell",
        transaction
      );

      console.log("Transaction successfully committed");
    });
  } catch (error) {
    console.error("Transaction rolled back due to error:", error);
  }
}

async function UpdatePortfolioLimit(portfolio, totalPrice, transaction) {
  const newLimit = portfolio.limit + totalPrice;
  await Portfolio.update(
    { limit: newLimit },
    { where: { id: portfolio.id }, transaction }
  );
}

async function RemoveShareFromThePortfolio(
  shareInPortfolio,
  portfolio,
  shareId,
  quantity,
  transaction
) {
  await PortfolioShare.update(
    { quantity: shareInPortfolio.quantity - quantity },
    {
      where: {
        portfolioId: shareInPortfolio.portfolioId,
        shareId: shareInPortfolio.shareId,
      },
      transaction,
    }
  );
}

async function UpdateShareQuantity(share, newQuantity, transaction) {
  await Share.update(
    { quantity: newQuantity },
    { where: { id: share.id }, transaction }
  );
}

async function CreateTransactionLog(
  portfolio,
  share,
  quantity,
  totalPrice,
  transactionType,
  transaction
) {
  const log = {
    userId: portfolio.userId,
    portfolioId: portfolio.id,
    shareId: share.id,
    quantity: quantity,
    pricePerShare: share.currentPrice,
    totalPrice: totalPrice,
    transactionType: transactionType,
    beforeLimit: portfolio.limit,
    afterLimit: portfolio.limit + totalPrice,
  };
  await Transactionlog.create(log, { transaction: transaction });
}
