const sequelize = require("./db");

const Share = require("../models/share");
const User = require("../models/user");
const Portfolio = require("../models/portfolio");
const PortfolioShare = require("../models/portfolioShare");
const Transactionlog = require("../models/transactionlog");

Start();

async function Start() {
  const shares = await Share.findAll({
    order: [["id", "ASC"]],
  });

  const msercan = await User.findOne({ where: { username: "msercan" } });
  const mchanbaz = await User.findOne({ where: { username: "mchanbaz" } });
  const fgurdal = await User.findOne({ where: { username: "fgurdal" } });

  await Buy(msercan.id, shares[0].id, 5);
  await Buy(msercan.id, shares[0].id, 5);
  await Buy(msercan.id, shares[1].id, 5);
  await Buy(msercan.id, shares[2].id, 5);

  await Buy(mchanbaz.id, shares[0].id, 1);
  await Buy(mchanbaz.id, shares[0].id, 1);
  await Buy(mchanbaz.id, shares[0].id, 3);

  await Buy(mchanbaz.id, shares[1].id, 5);
  await Buy(mchanbaz.id, shares[2].id, 3);
  await Buy(mchanbaz.id, shares[2].id, 2);

  await Buy(fgurdal.id, shares[3].id, 5);
}

async function Buy(userId, shareId, quantity) {
  try {
    await sequelize.transaction(async (transaction) => {
      const portfolio = await Portfolio.findOne({
        where: { userId: userId },
        transaction,
      });
      const share = await Share.findOne({
        where: { id: shareId },
        transaction,
      });
      const totalPrice = share.currentPrice * quantity;

      const isLimitExceed = !checkPortfolioLimit(portfolio, totalPrice);

      if (isLimitExceed) {
        throw new Error("Portfolio limit exceeded");
      }

      await UpdatePortfolioLimit(portfolio, totalPrice, transaction);

      await AddShareToThePortfolio(portfolio, shareId, quantity, transaction);

      const newShareQuantity = share.quantity - quantity;
      await UpdateShareQuantity(share, newShareQuantity, transaction);

      await CreateTransactionLog(
        portfolio,
        share,
        quantity,
        totalPrice,
        "buy",
        transaction
      );

      console.log("Transaction successfully committed");
    });
  } catch (error) {
    console.error("Transaction rolled back due to error:", error);
  }
}

function checkPortfolioLimit(portfolio, totalPrice) {
  return portfolio.limit >= totalPrice;
}

async function UpdatePortfolioLimit(portfolio, totalPrice, transaction) {
  const newLimit = portfolio.limit - totalPrice;
  await Portfolio.update(
    { limit: newLimit },
    { where: { id: portfolio.id }, transaction }
  );
}

async function AddShareToThePortfolio(
  portfolio,
  shareId,
  quantity,
  transaction
) {
  const shareInPortfolio = await PortfolioShare.findOne({
    where: { portfolioId: portfolio.id, shareId: shareId },
  });

  //the share to be bought already exists in the portfolio;
  if (!shareInPortfolio) {
    await PortfolioShare.create(
      {
        portfolioId: portfolio.id,
        shareId: shareId,
        quantity: quantity,
      },
      { transaction: transaction }
    );
  } else {
    await PortfolioShare.update(
      { quantity: shareInPortfolio.quantity + quantity },
      {
        where: {
          portfolioId: shareInPortfolio.portfolioId,
          shareId: shareInPortfolio.shareId,
        },
        transaction,
      }
    );
  }
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
  await Transactionlog.create(
    {
      userId: portfolio.userId,
      portfolioId: portfolio.id,
      shareId: share.id,
      quantity: quantity,
      pricePerShare: share.currentPrice,
      totalPrice: totalPrice,
      transactionType: transactionType,
      beforeLimit: portfolio.limit,
      afterLimit: portfolio.limit - totalPrice,
    },
    { transaction: transaction }
  );
}
