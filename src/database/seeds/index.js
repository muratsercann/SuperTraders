const sequelize = require("../db");
const { seedUsers } = require("./user");
const { seedShares } = require("./share");
const { seedPortfolios } = require("./portfolio");
const { createDatabase } = require("./create_db");
const { seedBuySell } = require("./buySell");
const User = require("../../models/user");

async function seedDatabase() {
  try {
    await createDatabase();

    await sequelize.sync();
    console.log("Models synchronized with database..");

    const count = await User.count();
    if (count > 0) {
      console.log("Seeding has been skipped..");
      return;
    }

    await seedUsers();
    console.log("Users seeded..");

    await seedShares();
    console.log("Shares seeded..");

    await seedPortfolios();
    console.log("Portfolios seeded..");

    await seedBuySell();
    console.log("Buy-Sell transactions seeded..");
  } catch (err) {
    console.error("An error occurred while seeding the database", err);
  }
}

module.exports = seedDatabase;
