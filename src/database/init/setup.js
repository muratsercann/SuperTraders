const sequelize = require("../db");
const { SeedDatabase } = require("./seed");
const { createDatabase } = require("./create");

const buyService = require("../../services/buyService");
const sellService = require("../../services/sellService");

const Share = require("../../models/share");
const User = require("../../models/user");
const Portfolio = require("../../models/portfolio");
const PortfolioShare = require("../../models/portfolioShare");
const Transactionlog = require("../../models/transactionlog");

async function setup() {
  await createDatabase();

  sequelize
    .sync()
    .then(() => {
      console.log("Models synchronized with database..");
      SeedDatabase().then(() => {
        CreateBuySell().then(() => {});
      });
    })
    .catch((err) => {
      console.error("An error occured while synchronizing the database", err);
    });
}

async function CreateBuySell() {
  try {
    const count = await Transactionlog.count();

    if (count > 0) {
      console.log("CreateBuySell for seeding has been skipped..");
      return;
    }

    await buyService.handleBuying(1, 1, 2);
    await buyService.handleBuying(1, 2, 1);
    await buyService.handleBuying(1, 1, 3);
    await buyService.handleBuying(1, 2, 4);
    await buyService.handleBuying(1, 3, 5);

    await buyService.handleBuying(2, 1, 2);
    await buyService.handleBuying(2, 2, 1);
    await buyService.handleBuying(2, 1, 3);
    await buyService.handleBuying(2, 2, 4);
    await buyService.handleBuying(2, 3, 5);

    await sellService.handleSelling(1, 1, 1);
    await sellService.handleSelling(1, 2, 1);
    await sellService.handleSelling(1, 3, 1);

    await sellService.handleSelling(2, 1, 1);
    await sellService.handleSelling(2, 2, 1);
    await sellService.handleSelling(2, 3, 1);
  } catch (error) {
    console.log(
      "An error occured while creating buy sell operations for seeding.."
    );
  }
}

module.exports = { setup };
