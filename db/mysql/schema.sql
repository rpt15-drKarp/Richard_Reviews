DROP DATABASE IF EXISTS reviews_db;

CREATE DATABASE IF NOT EXISTS reviews_db;

USE reviews_db;

DROP TABLE IF EXISTS review;

CREATE TABLE review(
  game_id INT AUTO_INCREMENT PRIMARY KEY,
  game VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  numOfGames INT NOT NULL,
  numOfReviews INT NOT NULL,
  posted DATE NOT NULL,
  recordHours INT NOT NULL,
  body TEXT NOT NULL,
  recommended BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  unhelpful INT NOT NULL,
  funny INT NOT NULL,
  comments INT NOT NULL,
  userPhoto VARCHAR(255) NOT NULL
);