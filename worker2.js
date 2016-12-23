const config = require('./config.js');
const redis = require('redis');
const client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);

client.brpop(config.REDIS_QUEUE_NAME, '0', function(error, res) {
  console.log('Worker2 Popped Element from the list');
});

client.quit();
