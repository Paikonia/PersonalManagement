const { createClient } = require("redis");
const redisClient = createClient();

const redisAddString = (key, value) => {
  redisClient.set(key, value);
};

const redisDeleteString = (key) => {
  return redisClient.del(key);
};

const redisGetString = async (key) => {
  return await redisClient.get(key);
};

module.exports = {
  redisClient,
  redisAddString,
  redisGetString,
  redisDeleteString,
};
