const express = require("express");
const sequelize = require("./src/database/db");

const Share = require("./src/models/share");
const User = require("./src/models/user");
const Portfolio = require("./src/models/portfolio");
const PortfolioShare = require("./src/models/portfolioShare");
const Transactionlog = require("./src/models/transactionlog");

sequelize.sync({force : true})
  .then(() => {
    console.log('Model veritabanıyla senkronize edildi.');
  })
  .catch(err => {
    console.error('Modeli senkronize ederken bir hata oluştu:', err);
  });
