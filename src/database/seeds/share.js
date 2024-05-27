const Share = require("../../models/share");

async function seedShares() {
    const shares = [
        {
          symbol: "AAA",
          currentPrice: 10.0,
          quantity: 1000,
        },
        {
          symbol: "BBB",
          currentPrice: 20.0,
          quantity: 1000,
        },
        {
          symbol: "CCC",
          currentPrice: 30.0,
          quantity: 1000,
        },
        {
          symbol: "DDD",
          currentPrice: 40.0,
          quantity: 1000,
        },
        {
          symbol: "EEE",
          currentPrice: 50.0,
          quantity: 1000,
        },
      ];
      

  await Share.bulkCreate(shares);
}

module.exports = { seedShares };
