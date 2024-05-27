const buyService = require("../../services/buyService");
const sellService = require("../../services/sellService");
const Transactionlog = require("../../models/transactionlog");
async function seedBuySell() {
  try {
    const count = await Transactionlog.count();

    if (count > 0) {
      console.log("Seed Buy-Sell for seedings have been skipped..");
      return;
    }
    //buy for userId : 1 
    await buyService.handleBuying(1, 1, 2);
    await buyService.handleBuying(1, 2, 1);
    await buyService.handleBuying(1, 1, 3);
    await buyService.handleBuying(1, 2, 4);
    await buyService.handleBuying(1, 3, 5);    
    //for userId : 1 => after buying =>  Total shares in the portfolio(shareId,count) : (1,5) - (2,5) - (3,5)
    
    //sell for userId : 1 
    await sellService.handleSelling(1, 1, 1);
    await sellService.handleSelling(1, 2, 1);
    await sellService.handleSelling(1, 3, 1);
    //for userId : 1 => after selling => Total shares in the portfolio(shareId,count) : (1,4) - (2,4) - (3,4)
    
    
    //buy for userId : 2
    await buyService.handleBuying(2, 1, 2);
    await buyService.handleBuying(2, 2, 1);
    await buyService.handleBuying(2, 1, 3);
    await buyService.handleBuying(2, 2, 4);
    await buyService.handleBuying(2, 3, 5);
    //for userId : 2 => after buying => Total shares in the portfolio(shareId,count) : (1,5) - (2,5) - (3,5)
    
    
    //sell for userId : 2
    await sellService.handleSelling(2, 1, 1);
    await sellService.handleSelling(2, 2, 1);
    await sellService.handleSelling(2, 3, 1);
    //for userId : 2 => after selling  =>  Total shares in the portfolio(shareId,count) : (1,5) - (2,5) - (3,5)

  } catch (error) {
    console.log(
      "An error occured while creating buy sell operations for seeding.."
    );
  }
}

module.exports = { seedBuySell };
