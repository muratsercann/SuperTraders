const sequelize = require("../database/db"); //only for transaction

const Transactionlog = require("../database/transactionlog");
const User = require("../database/user");
const Portfolio = require("../database/portfolio");
const PortfolioShare = require("../database/portfolioShare");
const Share = require("../database/share");

module.exports = { handleSelling };

async function handleSelling(userId, shareIdToSell, shareQuantityToSell) {
  try {
    const userData = await User.getUserWithAssociatedData(userId);

    if (!userData || !userData.id) {
      return { success: false, message: "User not found!" };
    }

    if (!userData.Portfolio) {
      return { success: false, message: "The user has not got a Portfolio for trade!" };
    }

    const shareToSell = await Share.getShareById(shareIdToSell);

    if (!shareToSell) {
      return {
        success: false,
        message: "There is no such share in the market !",
      };
    }

    const totalPriceforSell = shareToSell.currentPrice * shareQuantityToSell;

    const existingShareInPortfolio = userData.Portfolio.PortfolioShares?.find(
      (item) => item.shareId === shareIdToSell
    );

    if (!existingShareInPortfolio) {
      return {
        success: false,
        message: "The user has not got the share in his portfolio!",
      };
    }

    if (existingShareInPortfolio.quantity < shareQuantityToSell) {
      return {
        success: false,
        message:
          "The user has not got enough quantity of the share in his portfolio for sell!",
      };
    }

    const newPortfolioLimit = userData.Portfolio.limit + totalPriceforSell;

    //BEGIN TRANSACTION
    await sequelize.transaction(async (transaction) => {
      await Portfolio.updateLimit(
        userData.Portfolio.id,
        newPortfolioLimit,
        transaction
      );

      const newShareCountInPortfolio = existingShareInPortfolio.quantity - shareQuantityToSell;

      await PortfolioShare.updateShareQuantity(
        userData.Portfolio.id,
        shareIdToSell,
        newShareCountInPortfolio,
        transaction
      );

      const newShareCount = shareToSell.quantity + shareQuantityToSell;
      await Share.updateShareQuantity(
        shareIdToSell,
        newShareCount,
        transaction
      );

      await Transactionlog.create(
        userData,
        shareToSell,
        shareQuantityToSell,
        "sell",
        transaction
      );
    });
  } catch (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Share sold successfully !" };
}
