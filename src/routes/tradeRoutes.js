const express = require("express");
const tradeController = require("../controllers/tradeController");

const router = express.Router();

const validateInputs = (req, res, next) => {
  const { userId, shareId, quantity } = req.body;

  if (!Number.isInteger(userId) || userId <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid userId, must be a positive integer" });
  }

  if (!Number.isInteger(shareId) || shareId <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid shareId, must be a positive integer" });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid quantity, must be a positive integer" });
  }

  next();
};

router.post("/buy/", validateInputs, tradeController.createBuyOrder);

router.post("/sell/", validateInputs, tradeController.createSellOrder);

module.exports = router;
