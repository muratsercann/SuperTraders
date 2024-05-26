const buyService = require("../services/buyService");
const sellService = require("../services/sellService");

const createBuyOrder = async (req, res) => {
  const result = await buyService.handleBuying(
    req.body.userId,
    req.body.shareId,
    req.body.quantity
  );

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const createSellOrder = async (req, res) => {
  const result = await sellService.handleSelling(
    req.body.userId,
    req.body.shareId,
    req.body.quantity
  );

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

module.exports = {
  createBuyOrder,
  createSellOrder,
};
