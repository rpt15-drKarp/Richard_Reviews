const Promise = require('bluebird');
const pool = Promise.promisifyAll(require('./index.js'));
const generate = Promise.promisify(require('../generate.js'));

const runQuery = (newReviews, loopCnt)  => {
  let sqlString =  `INSERT INTO review (game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES ?`
  return pool.queryAsync(sqlString, [newReviews])
    .then((results) => {
      // console.log(`${results.affectedRows} records inserted`);
      // const mem = process.memoryUsage().heapUsed;
      // console.log(`Heap used: ${Math.round(mem / 1024 / 1024 * 100) / 100} MB`);

      if (loopCnt === 1) {
        console.log('Database seeded.');
        // console.log(process.memoryUsage());
        console.log('Finished at', new Date().toLocaleTimeString());
        process.exit();
      }
    })
    .catch(err => {throw err;});

}

const seed = async (numOfRecords) => {
  //use promise.map to control concurrency.
  let reviewsGenerated = []
  // issue lies with the constantly growing reviewsGenerated array.
  // should address this by working in batches.
  let loopCnt = numOfRecords/1000;
  //generate an array of promises
  for (loopCnt; loopCnt > 0; loopCnt--) {
    //if the number of records to seed is not divisible by 1000;
    if (loopCnt < 1) {
      let numReviews = loopCnt * 1000;
      generate(numReviews).then((newReviews) => {
        reviewsGenerated.push(newReviews)
      })
    } else {
      let newReviews = await generate(1000);
      reviewsGenerated.push(newReviews);
    };
    //increasing the number of record that are generated to be inserted allocated memory more efficiently
    if (loopCnt%1000) {
      //adding concurrency doesn't seem to be working as I would expect..
      await Promise.map(reviewsGenerated, (reviews) => {
        runQuery(reviews, loopCnt);
      }, {concurrency: 100}).then(() => {
        reviewsGenerated = null;
        reviewsGenerated= [];
      }).catch(err => {throw err;});
    }
  };
};

seed(10000000);