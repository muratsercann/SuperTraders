const express = require("express");
const sequelize = require("./db");

const Share = require("../models/share");
const User = require("../models/user");
const Portfolio = require("../models/portfolio");
const PortfolioShare = require("../models/portfolioShare");
const Transactionlog = require("../models/transactionlog");

sequelize.sync()//{force : true})
  .then(() => {
    console.log('Model veritabanıyla senkronize edildi.');
  })
  .catch(err => {
    console.error('Modeli senkronize ederken bir hata oluştu:', err);
  });
