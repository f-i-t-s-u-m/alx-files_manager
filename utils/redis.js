import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
    // this.client.connect();
  }

  isAlive() {
    if (this.client.connected) return true;
    return false;
  }

  async get(key) {
    const data = promisify(this.client.get).bind(this.client);
    const val = await data(key);
    return val;
  }

  async set(key, value, duration) {
    const pfun = promisify(this.client.set).bind(this.client);
    await pfun(key, value);
    const exfun = await promisify(this.client.expire).bind(this.client);
    exfun(key, duration);
  }

  async del(key) {
    const delfun = promisify(this.client.del).bind(this.client);
    await delfun(key);
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
