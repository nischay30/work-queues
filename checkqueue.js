const config = require('./config');
const redis = require('redis');
const client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);

client.lrange(config.REDIS_QUEUE_NAME,['0', '4'], function(error , list) {
    console.log('remaining elements in the list is :',list);
});

client.quit();