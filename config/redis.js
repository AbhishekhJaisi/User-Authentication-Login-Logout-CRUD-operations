const redis = require('redis');

const redisClient = redis.createClient({
    username: 'default',
    password: 'PF73YjIeIj1lV5gbYnm6hrGGANc4Ulf5',
    socket: {
        host: 'redis-14655.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14655
    }
});


module.exports = redisClient