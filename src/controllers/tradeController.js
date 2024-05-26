const buyShareService = require("../services/buyShareService");

const createBuyOrder = async (req, res) => {
  const result = await buyShareService.handleBuying(
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

// const createSellOrder = async (req, res) => {
//   const result = await sellShareService.handleSelling(
//     req.body.userId,
//     req.body.shareId,
//     req.body.quantity
//   );

//   if (result.success) {
//     res.status(200).json(result);
//   } else {
//     res.status(400).json(result);
//   }
// };

module.exports = {
  createBuyOrder,
};
