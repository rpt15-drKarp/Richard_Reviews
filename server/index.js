require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/api.js');
const compression = require('compression');
const app = express();
const port = 3001;
const path = require('path');

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use('/:gameId', express.static(__dirname + '/../public'));
app.use('/', express.static(__dirname + '/../public'));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/reviews/:gameId', (req, res) => {
  db.fetch(req.params.gameId).then((data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  }).catch((err) => {
    res.status(500).send({ error: 'Unable to fetch reviews from the database' });
  });
});

app.get('/api/reviews/mult/:limit', (req, res) => {
  db.fetchMult(req.params.limit).then((data) => {
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

app.all('*', (req, res) => {
  console.log(req.url)
  res.sendFile(path.join(__dirname, '../public/loaderio-9fca7766faf559127272cbb33cc62ba2.txt'));
})

app.listen(port, () => {
  console.log(`App listening on ${port}`);
  console.log( `Database being used: ${process.env.DB}`)
});
