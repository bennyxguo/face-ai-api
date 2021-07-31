import redis from 'redis';

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

export default redisClient;
