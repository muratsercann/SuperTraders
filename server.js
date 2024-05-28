const express = require("express");
const bodyParser = require("body-parser");
const tradeRoutes = require("./src/routes/tradeRoutes");
const cors = require("cors");
const initDatabase = require("./src/database/seeds/index");

async function run() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(cors());
  await initDatabase();

  app.use(bodyParser.json());
  app.use("/api/trade", tradeRoutes);

  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
}

run();
