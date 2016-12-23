const config = require('./config.js');
const redis = require('redis');
const async = require('async');

require('should');
describe('Work Queues in Redis', function() {
  var client;
  before(() => {
    workerClient = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
    publisherClient = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
  })
  it('pop', function(done) {

    async.parallel([
      function(callback) {
          workerClient.brpop(config.REDIS_QUEUE_NAME, '0', function(error, res) {
          let msgcount = 0;
          msgcount = msgcount + 1;
          msgcount.should.be.exactly(1);
          console.log('Worker1 is done');
          callback(null);
        });
      }, function(callback) {
          workerClient.brpop(config.REDIS_QUEUE_NAME, '0', function(error, res) {
          let msgcount = 0;
          msgcount = msgcount + 1;
          msgcount.should.be.exactly(1);
          console.log('Worker2 is done');
          callback(null);
        });
      }, function(callback) {
          workerClient.brpop(config.REDIS_QUEUE_NAME, '0', function(error, res) {
          let msgcount = 0;
          msgcount = msgcount + 1;
          msgcount.should.be.exactly(1);
          console.log('Worker3 is done');
          callback(null);
        });
      }, function(callback) {
         publisherClient.lpush(config.REDIS_QUEUE_NAME, 'a', function(error) {
          console.log('First entry is pushed');
          callback(null);
         });
      }, function(callback) {
         publisherClient.lpush(config.REDIS_QUEUE_NAME, 'b', function(error) {
          console.log('Second entry is pushed');
          callback(null);
         });
      }, function(callback) {
         publisherClient.lpush(config.REDIS_QUEUE_NAME, 'c', function(error) {
          console.log('Third entry is pushed');
          callback(null);
         });
      }], function(error, results) {
          done();
      });
  });
  after(() => {
    client.quit();
    client1.quit();
  })
});


/*require('should');
describe('Work Queues in Redis', function() {
  var client;
  before(() => {
    client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
  })
  it('pop',function(done) {

    let flag1 = false;
    let flag2 = false;
    let flag3 = false;

    client.lpush(config.REDIS_QUEUE_NAME, 'a');
    client.lpush(config.REDIS_QUEUE_NAME, 'b');
    client.lpush(config.REDIS_QUEUE_NAME, 'a');

    client.brpop(config.REDIS_QUEUE_NAME, '0', function(error, res) {
      flag1 = true;
      let msgcount = 0;
      msgcount = msgcount + 1;
      msgcount.should.be.exactly(1);
      console.log('worker1 is done');
      if(flag1 && flag2 && flag3) {
        done();
      }
    });
    client.brpop(config.REDIS_QUEUE_NAME, '0', function(error, res) {
      let msgcount = 0;
      flag2 = true;
      msgcount = msgcount + 1;
      msgcount.should.be.exactly(1);
      console.log('worker2 is done');
      if(flag1 && flag2 && flag3) {
        done();
      }
    });
    client.brpop(config.REDIS_QUEUE_NAME, '0', function(error, res) {
      let msgcount = 0;
      flag3 = true;
      msgcount = msgcount + 1;
      msgcount.should.be.exactly(1);
      console.log('worker3 is done');
      if(flag1 && flag2 && flag3) {
        done();
      }      
    });
  });
  after(() => {
    client.quit();
  })
});*/