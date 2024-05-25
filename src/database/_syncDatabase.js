const sequelize = require("./db");

const Share = require("../models/share");
const User = require("../models/user");
const Portfolio = require("../models/portfolio");
const PortfolioShare = require("../models/portfolioShare");
const Transactionlog = require("../models/transactionlog");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Model veritabanıyla senkronize edildi.");
    SeedDatabase();
  })
  .catch((err) => {
    console.error("Modeli senkronize ederken bir hata oluştu:", err);
  });

const users = [
  {
    username: "msercan",
    email: "msercan@mail.com",
    password: "12345"
  },
  {
    username: "fgurdal",
    email: "fgurdal@mail.com",
    password: "12345"
  },
  {
    username: "mchanbaz",
    email: "mchanbaz@mail.com",
    password: "12345"
  },
  {
    username: "asonar",
    email: "asonar@mail.com",
    password: "12345",
  },
  {
    username: "kozel",
    email: "kozel@mail.com",
    password: "12345",
  },
];

const shares = [
  {
    symbol: "XOT",
    currentPrice: 25.0,
    quantity: 1000,
  },
  {
    symbol: "AKC",
    currentPrice: 30.0,
    quantity: 1000,
  },
  {
    symbol: "TMS",
    currentPrice: 12.0,
    quantity: 1000,
  },
  {
    symbol: "HGY",
    currentPrice: 30.0,
    quantity: 1000,
  },
  {
    symbol: "FKV",
    currentPrice: 30.0,
    quantity: 1000,
  },
];

async function SeedDatabase() {
  try {
    const createdUsers = await User.bulkCreate(users);
    console.log("User bulk create finished");

    const createdShares = await Share.bulkCreate(shares);
    console.log("Share bulk create finished");

    const msercan = createdUsers.find((item) => item.username === "msercan");
    const mchanbaz = createdUsers.find((item) => item.username === "mchanbaz");
    const fgurdal = createdUsers.find((item) => item.username === "fgurdal");

    const portfolios = [
      {
        userId: msercan.id,
        limit: 1000.0,
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
