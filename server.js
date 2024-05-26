const express = require("express");
const bodyParser = require("body-parser");
const tradeRoutes = require("./src/routes/tradeRoutes");

const dbSetup = require("./src/database/init/setup");

async function run() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  await dbSetup.setup();

  app.use(bodyParser.json());
  app.use("/api/trade", tradeRoutes);

  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
}

run();
