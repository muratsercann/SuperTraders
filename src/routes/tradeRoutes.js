const express = require("express");
const tradeController = require("../controllers/tradeController");

const router = express.Router();

router.post("/buy/", tradeController.createBuyOrder);

router.post("/sell/", tradeController.createSellOrder);

module.exports = router;
