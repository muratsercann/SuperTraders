const createBuyOrder = (userId, shareSymbol, quantity) => {
  //business logic
  // a) The rate at which the shares will be bought will be the latest price in the database.
  // b) The share specified should be a registered one otherwise it should be considered a bad request.
  // c) The Portfolio of the user should also be registered otherwise it should be considered a bad request.

  return true;
};

const createSellOrder = (userId, shareSymbol, quantity) => {
  //business logic
  // a) The share should be there in the portfolio of the customer.
  // b) The Portfolio of the user should be registered otherwise it should be considered a bad request.
  // c) The rate at which the shares will be sold will be the latest price in the database.
  // d) The number of shares should be sufficient so that it can be sold.

  return true;
};

module.exports = {
  createBuyOrder,
  createSellOrder,
};
