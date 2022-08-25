import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.SB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'file_manager';
const URL = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(DATABASE);
    }).catch((error) => console.log(error));
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    console.log(users);
    const countUsers = await users.countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const countFiles = await files.countDocuments();
    return countFiles;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
