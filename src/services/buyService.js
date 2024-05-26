const sequelize = require("../database/db");

const Transactionlog = require("../database/transactionlog");
const User = require("../database/user");
const Portfolio = require("../database/portfolio");
const PortfolioShare = require("../database/portfolioShare");
const Share = require("../database/share");

module.exports = { handleBuying };

async function handleBuying(userId, shareIdToBuy, shareQuantityToBuy) {
  try {
    const userData = await User.getUserWithAssociatedData(userId);

    if (!userData || !userData.id) {
      return { success: false, message: "User does not exist!" };
    }

    if (!userData.Portfolio) {
      return { success: false, message: "Portfolio does not exist!" };
    }

    const shareToBuy = await Share.getShareById(shareIdToBuy);

    if (!shareToBuy) {
      return {
        success: false,
        message: "There is not exist such share in the market !",
      };
    }

    if (shareToBuy.quantity < shareQuantityToBuy) {
      return {
        success: false,
        message: "There is not enough quantity of the share!",
      };
    }

    const totalPrice = shareToBuy.currentPrice * shareQuantityToBuy;

    if (userData.Portfolio.limit < totalPrice) {
      return { success: false, message: "Portfolio Limit is not enough!" };
    }

    const newLimit = userData.Portfolio.limit - totalPrice;

    //BEGIN TRANSACTION
    await sequelize.transaction(async (transaction) => {
      await Portfolio.updateLimit(
        userData.Portfolio.id,
        newLimit,
        transaction
      );

      await AddShareToThePortfolio(
        userData,
        shareIdToBuy,
        shareQuantityToBuy,
        transaction
      );

      const newShareQuantity = shareToBuy.quantity - shareQuantityToBuy;

      await Share.updateShareQuantity(
        shareIdToBuy,
        newShareQuantity,
        transaction
      );

      await Transactionlog.create(
        userData,
        shareToBuy,
        shareQuantityToBuy,
        "buy",
        transaction
      );

    });

  } catch (error) {
    console.error("Transaction rolled back due to error:", error);
    return { success: false, message: error };
  }
  
  return { success: true, message: "Share bought successfully !" };
}

async function AddShareToThePortfolio(
  userData,
  shareIdToBuy,
  shareQuantityToBuy,
  transaction
) {
  //todo : edit
  const existingPortfolioShares = userData.Portfolio.PortfolioShares;
  const existingPortfolioShare = existingPortfolioShares.find(
    (item) => item.shareId === shareIdToBuy
  );

  if (
    !existingPortfolioShares ||
    !existingPortfolioShares.find((item) => item.shareId === shareIdToBuy)
  ) {
    await PortfolioShare.create(
      userData.Portfolio.id,
      shareIdToBuy,
      shareQuantityToBuy,
      transaction
    );
  } else {
    let shareInPortfolio = userData.Portfolio.PortfolioShares.find(
      (item) => item.shareId === shareIdToBuy
    );

    const newQuantity = shareInPortfolio.quantity + shareQuantityToBuy;

    await PortfolioShare.updateShareQuantity(
      userData.Portfolio.id,
      shareIdToBuy,
      newQuantity,
      transaction
    );
  }
}
