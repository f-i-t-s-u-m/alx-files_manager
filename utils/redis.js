import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
    this.client.connect();
  }

  isAlive() {
    if (this.client.connected) return true;
    return false;
  }

  async get(key) {
    const val = await this.client.get(key);
    return val;
  }

  async set(key, value, duration) {
    const res = await this.client.set(key, value, duration);
    await this.client.expire(key, duration);
    return res;
  }

  async del(key) {
    const res = await this.client.del(key);
    return res;
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
