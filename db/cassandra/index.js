const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews_db'
});

client.connect((err) => {
  if (err) {throw err};
  console.log('Connected to Cassandra database.');
})

module.exports = client;