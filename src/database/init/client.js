const { Client } = require('pg');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env].database;

const client = new Client({
    user: dbConfig.username,
    host: dbConfig.host,
    database: dbConfig.dialect,
    password: dbConfig.password,
    port: 5432,
  });

  module.exports = client;