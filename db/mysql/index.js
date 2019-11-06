const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reviews_db',
  connectTimeout: 30000
});

pool.getConnection(async (err, connection) => {
  if (err) {throw err};
  console.log('Connected to MySQL database.');
})

module.exports = pool;