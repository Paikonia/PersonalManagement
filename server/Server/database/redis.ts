const { createClient } = require("redis");
const redisClient = createClient();

export const redisAddString = (key:string, value:string) => {
  redisClient.set(key, value);
};

export const redisDeleteString = (key:string) => {
  return redisClient.del(key);
};

export const redisGetString = async (key:string) => {
  return await redisClient.get(key);
};

export default redisClient