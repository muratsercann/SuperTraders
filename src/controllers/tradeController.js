const tradeService = require("../services/tradeService");

const createBuyOrder = async (req, res) => {
  //validate params
  if (!req.body.userId || !req.body.shareSymbol || !req.body.quantity) {
    return res.send({ status: "bad request" });
  }
  const result = await tradeService.createBuyOrder(
    req.body.userId,
    req.body.shareSymbol,
    req.body.quantity
  );
  return res.send({ status: "OK", data: result });
};


const createSellOrder = async (req, res) => {
  //validate params
  if (!req.body.userId || !req.body.shareSymbol || !req.body.quantity) {    
    return res.status(400).send({ status: "bad request" });;
  }
  const result = await tradeService.createSellOrder(
    req.body.userId,
    req.body.shareSymbol,
    req.body.quantity
  );
  return res.send({ status: "OK", data: result });
};

module.exports = {
  createSellOrder,
  createBuyOrder,
};
