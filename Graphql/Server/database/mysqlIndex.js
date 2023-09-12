const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const makeDatabaseCall = async (query) => {
  return new Promise(async (resolve, reject) => {
    query = mysql.format(query);
    
    query = mysql.raw(query).toSqlString();
    
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query(query);
      connection.release();
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = makeDatabaseCall;
