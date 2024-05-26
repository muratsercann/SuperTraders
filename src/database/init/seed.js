const Share = require("../../models/share");
const User = require("../../models/user");
const Portfolio = require("../../models/portfolio");
const initialData = require("./initial_data");

async function SeedDatabase() {
  try {
    const createdUsers = await User.bulkCreate(initialData.users);
    console.log("Bulk create for Users finished");

    const createdShares = await Share.bulkCreate(initialData.shares);
    console.log("Bulk create for Shares finished");

    const msercan = createdUsers.find((item) => item.username === "msercan");
    const mchanbaz = createdUsers.find((item) => item.username === "mchanbaz");
    const fgurdal = createdUsers.find((item) => item.username === "fgurdal");

    const portfolios = [
      {
        userId: msercan.id,
        limit: 100000.0,
      },
      {
        userId: mchanbaz.id,
        limit: 1000.0,
      },
      {
        userId: fgurdal.id,
        limit: 1000.0,
      },
    ];

    const createdPortfolios = await Portfolio.bulkCreate(portfolios);

    console.log("Portfolio bulk create finished");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { SeedDatabase };
