const client = require('./index.js')
const Promise = require('bluebird')
const generate = Promise.promisify(require('../generate.js'));

const seed = async (numOfReviews) => {
  console.log('Started at', new Date().toLocaleTimeString());
  let queries = [];
  let loopCnt = numOfReviews/50;
  const queryString = 'INSERT INTO reviews (game_id, game, author, numOfGames, numOfReviews, posted, recordHours, body, recommended, helpful, unhelpful, funny, comments, userPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  for (loopCnt; loopCnt > 0; loopCnt--) {
    //generate x reviews (which is given as an array or arrays)
    let newReviews = await generate(50);
    //for loop to generate the queries
    for (let i = 0; i < newReviews.length; i++) {
      let obj = {};
      let gameId = ((loopCnt * 50) - i);
      newReviews[i].unshift(gameId);
      obj.query = queryString;
      obj.params = newReviews[i];
      queries.push(obj);
    }
    //create batches of reviews to be inserted
    // if (loopCnt%1000) {
    await client.batch(queries, {prepare: true})
      .then((results) => {
        // const mem = process.memoryUsage().heapUsed;
        // console.log(`Heap used: ${Math.round(mem / 1024 / 1024 * 100) / 100} MB`);
        queries = null;
        queries = [];
        if (loopCnt===1){
          console.log('Finished at', new Date().toLocaleTimeString());
          process.exit();
        }
      }).catch((err) => { if (err) throw err;})
    //}
  }
}

console.log('Started at', new Date().toLocaleTimeString());
connection = Promise.promisifyAll(connection)
seed(10000000)