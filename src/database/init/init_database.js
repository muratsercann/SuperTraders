const { createDatabase } = require("./create_database");
const { syncDatabase } = require("./sync_database");

async function init() {
  await createDatabase();
  await syncDatabase();
}

init();