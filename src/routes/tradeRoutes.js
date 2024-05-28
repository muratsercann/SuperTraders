const express = require("express");
const tradeController = require("../controllers/tradeController");
const mainController = require("../controllers/mainController");

const router = express.Router();

const validateInputs = (req, res, next) => {
  const { userId, shareId, quantity } = req.body;
  let errors = [];
  if (!Number.isInteger(userId) || userId <= 0) {
    errors.push("userId must be a positive integer");
  }

  if (!Number.isInteger(shareId) || shareId <= 0) {
    errors.push("shareId must be a positive integer");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    errors.push("quantity must be a positive integer");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  next();
};

router.post("/buy/", validateInputs, tradeController.createBuyOrder);

router.post("/sell/", validateInputs, tradeController.createSellOrder);

router.get("/users/", mainController.getAllUsers);

router.get("/shares/", mainController.getAllShares);

router.get("/logs/", mainController.getTransactionLogs);

module.exports = router;
