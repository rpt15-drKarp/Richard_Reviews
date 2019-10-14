DROP KEYSPACE IF EXISTS reviews_db;

CREATE KEYSPACE reviews_db WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

DROP TABLE IF EXISTS reviews_db.reviews;

CREATE TABLE reviews_db.reviews (
  game_id int PRIMARY KEY,
  game text,
  author text,
  numOfGames int,
  numOfReviews int,
  posted date,
  recordHours int,
  body text,
  recommended boolean,
  helpful int,
  unhelpful int,
  funny int,
  comments int,
  userPhoto text
);