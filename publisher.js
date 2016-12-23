const config = require('./config.js');
const redis = require('redis');
const client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);

client.lpush(config.REDIS_QUEUE_NAME, 'a', function(error, count, res) {
  console.log('Total Elements in the list after pushing',count);
});

// client.quit();
