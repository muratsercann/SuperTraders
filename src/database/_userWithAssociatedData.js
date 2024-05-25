const User = require("../models/user");
const Share = require("../models/share");
const Portfolio = require("../models/portfolio");
const PortfolioShare = require("../models/portfolioShare");
const Transactionlog = require("../models/transactionlog");

start();
async function start() {
  const user = await User.findOne({
    where: { id: 1 },
    include: {
      model: Portfolio,
      attributes : ["id","userId","limit"],
      include: {
        model: PortfolioShare,
        attributes : ["id","portfolioId","shareId","quantity"],
        include: {
          model: Share,
          attributes : ["id","symbol","currentPrice","quantity"],
        },
      },
    },
  });

 

  console.log("\n\nusername : ", user.username);
  console.log("portfolio id : ", user.Portfolio.id);
  console.log("portfolio limit : $", user.Portfolio.limit);
  console.log("shares in portfolio : \n");

  user.Portfolio.PortfolioShares.forEach(item => {
    const info = [
      `share id : ${item.shareId}`,
      `share symbol : ${item.Share.symbol}`,
      `share quantity in the portfolio : ${item.quantity}`
    ].join('\n');
    
     console.log(info + "\n");
    // console.log("share id : ", item.shareId);
    // console.log("share symbol :",item.Share.symbol);
    // console.log("share quantity in the portfolio :",item.Share.quantity);
  });
}
