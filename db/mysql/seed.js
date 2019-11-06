const Promise = require('bluebird');
const pool = Promise.promisifyAll(require('./index.js'));
const generate = Promise.promisify(require('../generate.js'));
const faker = require('faker');

// const runQuery = (newReviews, n)  => {
//   let sqlString =  `INSERT INTO review (author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto, game_id) VALUES ?`
//   return pool.queryAsync(sqlString, [newReviews])
//     .catch(err => {throw err;});

// }

const seed = async (numOfRecords) => {
  console.log('Started seeding reviews at', new Date().toLocaleTimeString());
  //use promise.map to control concurrency.
  let sqlString =  `INSERT INTO review (author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto, game_id) VALUES ?`
  let reviewsGenerated = [];
  // issue lies with the constantly growing reviewsGenerated array.
  // should address this by working in batches.
  let loopCnt = numOfRecords/1000;
  //generate an array of promises
  for (let n = 0; n < loopCnt; n++) {
    //generate 100 reviews per game
    let gameId = n*10;
    let newReviews = [];
    for (let i = 1; i < 11; i++) {
      let newId = gameId+i;
      let reviewsPerGame = await generate(100, newId);
      newReviews.push(reviewsPerGame);
    }
      let reviewsAry = [].concat(...newReviews);
      reviewsGenerated.push(reviewsAry);
    //increasing the number of record that are generated to be inserted allocated memory more efficiently
    if ((n > 0) && !((n + 1) % 1000)) {
      //adding concurrency doesn't seem to be working as I would expect..
      await Promise.map(reviewsGenerated, (reviews) => {
        return pool.queryAsync(sqlString, [reviews]).catch(err => {throw err;});
      }).then(() => {
        if (n === (loopCnt-1)) {
          console.log('Database seeded.');
          // console.log(process.memoryUsage());
          console.log('Finished at', new Date().toLocaleTimeString());
          process.exit();
        };
        reviewsGenerated = null;
        reviewsGenerated= [];
      }).catch(err => {throw err;});
    }
  };
};

const seedGames = async (numOfReviews) => {
  console.log('Seeding games at', new Date().toLocaleTimeString());
  let numOfGames = numOfReviews/100;
  let gamesAry = [];
  let sqlString = `INSERT INTO game (name) VALUES ?`
  for (let i = 0; i < numOfGames; i++) {
    gamesAry.push([faker.company.companyName()]);
    // const mem = process.memoryUsage().heapUsed;
    // console.log(`Heap used: ${Math.round(mem / 1024 / 1024 * 100) / 100} MB`);
    // console.log(numOfGames%100)
    if ((i > 0) && !((i + 1) % 1000)) {
      // console.log(gamesAry)
      await pool.queryAsync(sqlString, [gamesAry]).then(() => {
        gamesAry = null;
        gamesAry= [];
        if (i === 99999) {
          console.log('Finished seeding games at', new Date().toLocaleTimeString());
        }
      }).catch(err => {throw err;});
    }
  }
}

seedGames(10000000);
seed(10000000);