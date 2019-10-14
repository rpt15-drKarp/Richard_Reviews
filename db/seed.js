const {Review} = require('./index.js');
const Promise = require('bluebird')
const generate = Promise.promisify(require('./generate.js'));

generate(10).then(function(reviews) {
  Review.insertMany(reviews, (err, revs) => {
    if (err) {
      throw(err);
    } else {
      console.log('Successfully seeded data!');
    }
  });
})