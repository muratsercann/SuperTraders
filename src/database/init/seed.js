const Share = require("../../models/share");
const User = require("../../models/user");
const Portfolio = require("../../models/portfolio");
const initialData = require("./data");

async function SeedDatabase() {
  try {
    const count = await User.count();

    if (count > 0) {
      console.log("Seeding has been skipped..");
      return;
    }

    console.log("Seeding has been started..");

    const createdUsers = await User.bulkCreate(initialData.users);
    console.log(`Created ${initialData.users.length} users`);

    const createdShares = await Share.bulkCreate(initialData.shares);
    console.log("Bulk create for Shares finished");
    console.log(`Created ${initialData.shares.length} Shares`);

    let portfolios = [];

    for (let i = 1; i < 4; i++) {
      portfolios.push({
        userId: i,
        limit: 1000,
      });
    }

    const createdPortfolios = await Portfolio.bulkCreate(portfolios);
    console.log(`Portfolios for users with id : [1,2,3] has been created`);
  } catch (error) {
    console.log("An error occured while seeding database! : ");
    console.log(error);
  }
}

module.exports = { SeedDatabase };
