const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/reviews', { useNewUrlParser: true });
const Promise = require('bluebird');

let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'mongodb connection error'));
dbConnection.once('open', () => {
  console.log('connected to mongoDb');
});

const schema = new mongoose.Schema({
  game: String,
  gameId: Number,
  author: String,
  numOfGames: Number,
  numOfReviews: Number,
  posted: String,
  recordHours: Number,
  body: String,
  recommended: Boolean,
  helpful: Number,
  unhelpful: Number,
  funny: Number,
  comments: Number,
  userPhoto: String
})

const Review = mongoose.model('Reviews', schema);

const fetch = (gameId) => {
  return Review.find({gameId: gameId});
};

const update = (gameId, changes) => {
  Review.updateOne({gameId: gameId}, changes, (err, res) => {
    if (err) {
      throw(err);
    } else {
      return res;
    };
  })
};

const remove = (gameId) => {
  Review.deleteOne({gameId: gameId}, (err) => {
    if (err) {
      throw(err);
    } else {
      return `${gameId} deleted.`
    }
  })
}

const add = (obj) => {
  Review.insertMany(obj, (err, reviews) => {
    if (err) {
      throw(err);
    } else {
      return 'Successfully created a new review!';
    }
  })
};

module.exports = {
  db,
  Review,
  fetch,
  update,
  remove,
  add
};
