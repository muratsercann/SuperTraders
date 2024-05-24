const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const tradeRoutes = require("./src/routes/tradeRoutes");
const sequelize = require("./src/database/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use("/api/users", userRoutes);
app.use("/api/trade", tradeRoutes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
