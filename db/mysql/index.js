const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reviews_db'
});

pool.getConnection(async (err, connection) => {
  if (err) {throw err};
  console.log('Connected to MySQL database.');
})

module.exports = pool;