require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/api.js');
const compression = require('compression');
const app = express();
const port = 3001;

const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', (err) => { throw(err); })

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use('/', express.static(__dirname + '/../public'));
app.use('/:gameId', express.static(__dirname + '/../public'));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/reviews', (req, res) => {
  let gameId = req.query.gameId;
  redisClient.get(gameId, (err, cache) => {
    // if reviews exist in cache send from cache
    if (cache) {
      res.status(200);
      res.send(cache);
    } else {
      if (err) { throw(err); }
      // call database and put in cache
      db.fetch(gameId).then((data) => {
        let result = JSON.stringify(data);
        redisClient.set(gameId, result, redis.print);
        res.status(200);
        res.send(result);
      }).catch((err) => {
        res.status(500).send({ error: 'Unable to fetch reviews from the database' });
      });
    };
  });
});

app.get('/api/reviews/mult', (req, res) => {
  redisClient.get()
  db.fetchMult(req.query.limit).then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  }).catch((err) => {
    res.status(500).send({ error: 'Unable to fetch reviews from the database' });
  });
});

app.post('/api/reviews', (req, res) => {
  let newReview = JSON.parse(req.body.review)
  db.add(newReview).then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  }).catch((err) => {
    res.status(500).send({ error: 'Unable to create this review from the database' });
  });
});

app.put('/api/reviews', (req, res) => {
  db.update(req.body.gameId, req.body).then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  }).catch((err) => {
    res.status(500).send({ error: 'Unable to update this review from the database' });
  });
});

app.delete('/api/reviews', (req, res) => {
  db.remove(req.body.gameId).then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  }).catch((err) => {
    res.status(500).send({ error: 'Unable to delete this review from the database' });
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
  console.log( `Database being used: ${process.env.DB}`)
});
