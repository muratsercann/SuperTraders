const sequelize = require("../db");
const { SeedDatabase } = require("./seed");
const Share = require("../../models/share");
const User = require("../../models/user");
const Portfolio = require("../../models/portfolio");
const PortfolioShare = require("../../models/portfolioShare");
const Transactionlog = require("../../models/transactionlog");

async function syncDatabase() {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Models synchronized with database..");
      SeedDatabase();
    })
    .catch((err) => {
      console.error("An error occured while synchronizing the database", err);
    });
}
module.exports = { syncDatabase };
