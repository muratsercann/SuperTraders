const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/routes/userRoutes");
const sequelize = require("./src/database/db");

const app = express();
const PORT = process.env.PORT || 3000;

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Model veritabanıyla senkronize edildi.');
//   })
//   .catch(err => {
//     console.error('Modeli senkronize ederken bir hata oluştu:', err);
//   });

app.use(bodyParser.json());
app.use("/api/users", router);



app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
