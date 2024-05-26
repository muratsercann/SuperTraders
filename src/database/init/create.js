const client = require("./client");
const config = require("../config");

async function createDatabase() {
  const env = process.env.NODE_ENV || "development";
  const dbConfig = config[env].database;

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${dbConfig.database}'`
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbConfig.database}`);
      console.log(`Database ${dbConfig.database} created successfully`);
    } else {
      console.log(`Database ${dbConfig.database} already exists`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await client.end();
  }
}

module.exports = { createDatabase };
