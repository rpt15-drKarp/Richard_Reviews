const Promise = require('bluebird');
let dbUsed = process.env.DB;
let sql = '';
let noSql = '';
if (dbUsed === 'mysql') {
  sql = Promise.promisifyAll(require('./mysql/index.js'));
} else if (dbUsed === 'cassandra') {
  noSql = Promise.promisifyAll(require('./cassandra/index.js'));
}

const fetch = (gameId) => {
  if (dbUsed === 'mysql') {
    return sql.queryAsync(`SELECT * FROM review WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    return noSql.executeAsync(`SELECT * FROM reviews_db.reviews WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const update = (gameId, obj) => {
  if (dbUsed === 'mysql') {
    return sql.queryAsync(`UPDATE review SET ${obj.col} = ${obj.val} WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    return noSql.executeAsync(`UPDATE review SET ${obj.col} = ${obj.val} WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const remove = (gameId) => {
  if (dbUsed === 'mysql') {
    return sql.queryAsync(`DELETE FROM review WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    return noSql.executeAsync(`DELETE FROM review WHERE game_id = ${gameId}`).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const add = (review) => {
  if (dbUsed === 'mysql') {
    return sql.queryAsync(`INSERT INTO review(author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto, game_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, review).then((results) => {
      console.log(results.insertId);
      let data = JSON.parse(JSON.stringify(results));
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    //need to get a game_id and push it to the review array
    return noSql.executeAsync(`INSERT INTO reviews_db.reviews (game_id, game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, review, { prepare: true }).then((results) => {
      let data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

const fetchMult = (limit) => {
  if (dbUsed === 'mysql') {
    return sql.queryAsync(`SELECT * FROM review LIMIT ${limit}`).then((results) => {
      data = JSON.parse(JSON.stringify(results))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else if (dbUsed === 'cassandra') {
    return noSql.executeAsync(`SELECT * FROM reviews_db.reviews LIMIT ${limit}`).then((results) => {
      data = JSON.parse(JSON.stringify(results.rows))
      return data;
    }).catch((err) => {if(err) {throw err}});
  } else {
    console.log ('The database being used is not supported by this app.')
  };
};

module.exports = {
  fetch,
  update,
  remove,
  add,
  fetchMult
};