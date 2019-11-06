const faker = require('faker');

module.exports = (numOfData, id, callback) => {
  let json = [];
  for (let i = 0; i < numOfData; i++) {
    let newReview = [];
    //newReview.push(faker.company.companyName());
    newReview.push(faker.internet.userName());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.date.past());
    newReview.push(faker.random.number());
    newReview.push(faker.lorem.paragraph());
    newReview.push(faker.random.boolean());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.random.number());
    newReview.push(faker.image.avatar());
    newReview.push(id);
    if(numOfData===1) {
      callback(null, newReview);
    } else {
      json.push(newReview);
    }
  }
  callback(null, json);
};
