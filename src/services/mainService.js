const Transactionlog = require("../database/transactionlog");
const User = require("../database/user");
const Portfolio = require("../database/portfolio");
const PortfolioShare = require("../database/portfolioShare");
const Share = require("../database/share");

async function getAllShares() {
  return await Share.getAllShares();
}

async function getAllUsers() {
  return await User.getAllUsers();
}

async function getTransactionLogs() {
  return await Transactionlog.getAll();
}

module.exports = { getAllShares, getAllUsers, getTransactionLogs };
