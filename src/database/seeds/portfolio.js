const Portfolio = require("../../models/portfolio");

async function seedPortfolios() {
  const portfolios = [
    {
      userId: 1,
      limit: 1000,
    },
    {
      userId: 2,
      limit: 1000,
    },
    {
      userId: 3,
      limit: 1000,
    },
  ];

  await Portfolio.bulkCreate(portfolios);
}

module.exports = { seedPortfolios };
