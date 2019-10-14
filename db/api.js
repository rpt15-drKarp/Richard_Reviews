const noSql = require('./cassandra/index.js')
const sql = require('./mysql/index.js')

let dbUsed = process.env.DB

const fetch = (gameId, callback) => {
  if (dbUsed === 'mysql') {
    sql.pool.query(`SELECT * FROM review WHERE game_id = ${gameId}`, (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else if (dbUsed === 'cassandra') {
    noSql.client.execute(`SELECT * FROM reviews_db.reviews WHERE game_id = ${gameId}`, (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const update = (gameId, obj, callback) => {
  if (dbUsed === 'mysql') {
    sql.pool.query(`UPDATE games SET ${obj.col} = ${obj.val} WHERE game_id = ${gameId}`, (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else if (dbUsed === 'cassandra') {
    noSql.client.execute(`UPDATE games SET ${obj.col} = ${obj.val} WHERE game_id = ${gameId}`, (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const remove = (gameId, callback) => {
  if (dbUsed === 'mysql') {
    sql.pool.query(`DELETE FROM review WHERE game_id = ${gameId}`, (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else if (dbUsed === 'cassandra') {
    noSql.client.execute(`DELETE FROM review WHERE game_id = ${gameId}`, (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const add = (review, callback) => {
  if (dbUsed === 'mysql') {
    sql.pool.query(`INSERT INTO review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES ?`, [review], (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else if (dbUsed === 'cassandra') {
    //need to get a game_id and push it to the review array
    noSql.client.execute(`INSERT INTO reviews_db.reviews (game_id, game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [review], (err, results) => {
      if (err) {throw err;};
      callback(null, results);
    })
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

module.exports = {
  fetch,
  update,
  remove,
  add
};