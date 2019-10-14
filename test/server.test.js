const React = require ('react');
const { shallow, mount, render } = require ('enzyme');
// const request = require ('request');
import request from 'request';
// import { exportAllDeclaration } from '@babel/types';
const faker = require('faker')

test('Fetch reviews from database', (done) => {
  request('http://localhost/api/reviews', (err, res, body) => {
    var reviews = JSON.parse(body);
    expect(reviews.length).toBe(100);
    done();
  });
});

test('Post reviews to database', (done) => {
  request.post('http://localhost/api/reviews', {
    game: 'Hello Friends',
    gameId: faker.random.number(),
    author: faker.internet.userName(),
    numOfGames: faker.random.number(),
    numOfReviews: faker.random.number(),
    posted: faker.date.past(),
    recordHours: faker.random.number(),
    body: faker.lorem.paragraph(),
    recommended: faker.random.boolean(),
    helpful: faker.random.number(),
    unhelpful: faker.random.number(),
    funny: faker.random.number(),
    comments: faker.random.number(),
    userPhoto: faker.image.avatar()
  }, (err, res, body) => {
    var reviews = JSON.parse(body);
    expect(reviews).toBe('Successfully created a new review!');
    done();
  });
});

test('Update review in database', (done) => {
  request.put('http://localhost/api/reviews', {game: 'Hello Friends', numOfGames: 10 }, (err, res, body) => {
    var reviews = JSON.parse(body);
    console.log(reviews)
    //expect(reviews.length).toBe(100);
    done();
  });
});

test('Delete review in database', (done) => {
  request.delete('http://localhost/api/reviews', {game: 'Hello Friends'}, (err, res, body) => {
    var reviews = JSON.parse(body);
    expect(reviews.length).toBe(100);
    done();
  });
});