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
      return { success: false, message: "User does not exist!" };
    }

    if (!userData.Portfolio) {
      return { success: false, message: "Portfolio does not exist!" };
    }

    const shareToSell = await Share.getShareById(shareIdToSell);

    if (!shareToSell) {
      return {
        success: false,
        message: "There is not exist such share in the market !",
      };
    }

    const totalPriceforSell = shareToSell.currentPrice * shareQuantityToSell;

    //todo :
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
    console.error("Transaction rolled back due to error:", error);
    return { success: false, message: error };
  }

  return { success: true, message: "Share sold successfully !" };
}

async function RemoveShareFromThePortfolio(
  userData,
  shareIdToBuy,
  shareQuantityToBuy,
  transaction
) {
  await PortfolioShare.updateShareQuantity(
    userData.Portfolio.id,
    shareIdToBuy,
    newQuantity,
    transaction
  );
}
