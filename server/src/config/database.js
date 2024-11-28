const mysql2 = require("mysql2");
require("dotenv").config();

const pool = mysql2.createPool({
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
});

module.exports = pool.promise();
