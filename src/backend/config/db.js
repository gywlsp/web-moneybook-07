// get the client
const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const dbPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
});

module.exports = dbPool;
